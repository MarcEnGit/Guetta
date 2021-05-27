const express = require("express");
const spawn = require("child_process").spawn;
const fileupload = require("express-fileupload");
const cors = require("cors");
const crypto = require('crypto');
const ms = require('mediaserver');
const readline = require('readline');
const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg')
const getVideoId = require('get-video-id');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const app = express();

ffmpeg.setFfmpegPath(ffmpegPath);

const DBSOURCE = "db.sqlite"
var insert = 'INSERT INTO emails(filename, email) VALUES (?,?)'


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS emails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename text,
            email text
            )`,
        (err) => {
            if (err) {
                console.log(err);
            }
         });
    }
});

app.use(cors());
app.use(fileupload());
app.use(express.static("separated/demucs_quantized/"));

app.post("/upload", (req, res) => {
    const file = req.files.file;
    var filename = new Date().valueOf() + crypto.randomBytes(5).toString('hex')+".mp3";
    var newpath = __dirname + "/files/";
    file.mv(`${newpath}${filename}`, (err) => {
        if (err) {
            res.status(500).send({ message: "File upload failed", code: 200 });
        }
        res.send(filename);
    });
});

app.get('/download', function(req, res){
  var filename = req.query.filename;
  const file = `${__dirname}/separated/demucs_quantized/`+filename;
  res.download(file); // Set disposition and send it.
});

app.post("/ytconvert", (req, res) => {
    const url = req.body.urlText;
    ytToMp3(url,res);
});

function fileNameAndExt(str){
  var file = str.split('.');
  console.log(file);
  return file[0];
}

app.post("/separate", async (req, res) => {
    const url = req.body.filename;
    await separate("files/"+url,url,res);
});

app.get('/play', (req, res) => {
    try{
        var file = fileNameAndExt(req.query.file);
        var route = "/home/marc_ortiz_7e3/Guetta/api/separated/demucs_quantized/"+file;
        var array = fs.readdirSync(route);
        res.send(array);
    }catch(e){
        console.log(e);
    }
});

app.post("/sendmail", (req, res) => {
        var filename = fileNameAndExt(req.body.filename);
        var email = req.body.email;
        console.log('lets insert '+email);
        db.run(insert, [filename, email]);
	console.log('insert done');
	res.send(email+' received');
});

app.listen(3002, () => {
    console.log("Server running successfully on 3002");
});

function ytToMp3(url,res){
    var filename = new Date().valueOf() + crypto.randomBytes(5).toString('hex');
    var newpath = __dirname + "/files/"+filename;
    let start = Date.now();
    const { id } = getVideoId(url);
                console.log(id);
                let stream = ytdl(id, {
                quality: 'highestaudio',
                });
                ffmpeg(stream)
          .audioBitrate(128)
          .save(newpath+'.mp3')
          .on('progress', p => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`${p.targetSize}kb downloaded`);
          })
        .on('end', () => {
            console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
            res.send(filename+".mp3");
        });
}

function separate(filepath, filename, res) {
    var conda_exec = "~/anaconda3/bin/conda";
    var env_name = "demucs";
    var sub_cmd = "~/anaconda3/envs/demucs/bin/python3.7 -m demucs.separate -d cpu " + filepath;
    var command = [conda_exec, 'run', '-n', env_name, sub_cmd];
    var spawn_ = spawn(command.join(" "), { shell: true });
    console.log('Converting ' + filename);
    spawn_.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    spawn_.stderr.on('data', function (data) {
        console.log(data.toString());
    });
    spawn_.on('exit', function (code) {
        console.log(code);
        console.log(filename+' separated');
        getmail(filename,res);
        //res.redirect('/play?file=' + filename);
    });
}

function getmail(filen, res){
    var file = fileNameAndExt(filen);
    console.log("nombre separado "+file);
    var sql = 'select * from emails where filename= "'+ file + '\"';
    var params = [];
	console.log(sql);
	db.all(sql, params, (err, rows) => {
        if (err) {
          console.log(err);
        }
	if(rows[0] !== undefined){
		enviarmail(rows[0].email, file,res);
	}else{
		res.send('end');
	}
 	
      });
    };

function enviarmail(email,filen,res){
	const transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'guetta.app@gmail.com',
	    pass: 'GuettaApp2005'
	  }
	});
	const mailOptions = {
  	  from: 'guetta-app.com',
	  to: email,
	  subject: 'Your song is ready!',
	  html: "<p><img style='display: block; margin-left: auto; margin-right: auto;' src='https://i.ibb.co/zRTF5dT/logo-img.png' alt='logo-img' width='128' height='128' border='0' /></p>"+
	"<h1 style='text-align: center;'>Your link&nbsp;is ready!</h1>"+
	"<p>You can access the link in the next 24 hours, so be fast and download your splitted song! You can download and play the different splitted parts of the song you uploaded comfortably!</p>"+
	"<p>&nbsp;</p>"+
	"<p>Your link : <span>http://guetta-app.com/files?file="+filen+"</span></p>"+
	"<p>&nbsp;</p>"+
	"<p>Wish you liked our web app and give us a 10/10!</p>"
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	    res.end('mail received');
	  }
	});
}

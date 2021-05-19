const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const crypto = require('crypto');
const ms = require('mediaserver');
const readline = require('readline');
const spawn = require("child_process").spawn;
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const getVideoId = require('get-video-id');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const app = express();

const DBSOURCE = "db.sqlite"
var insert = 'INSERT INTO emails(filename, email) VALUES (?,?)'


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE emails (
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
        var route = "/home/marc_ortiz_7e3/Guetta-master/api/separated/demucs_quantized/"+file;
        var array = fs.readdirSync(route);
        console.log(array);
        res.writeHead(200, {'Content-Type': 'text/html'});
        for (var src  of array) {
            console.log(file+'/'+src)
            res.write('<audio controls>');
            res.write('<source src=\"http://35.205.50.110:3002/' +file+'/'+src +'\" type="audio/ogg">');
            res.write('</audio>');
            res.write('<p><a href=\"http://35.205.50.110:3002/' +file+'/'+src+'\" download>'+src+'</p>');
        }
        res.end();
    }catch(e){
        console.log(e);
    }
});

app.post("/sendmail", (req, res) => {
        var filename = fileNameAndExt(req.body.filename);
        var email = req.body.email;
        console.log(email)
        db.run(insert,[filename,email]);
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
        console.log('exit');
        console.log(filename+' separated');
        getmail(filename);
        res.redirect('/play?file=' + filename);
    });
}

function getmail(filename){
    var sql = 'select email from emails where filename = "'+fileNameAndExt(filename)+'"';
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
          console.log(err);
        }
        //enviar mail
        console.log(rows);
      });
    });
}

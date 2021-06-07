# Guetta

## Description
 

## Installation

Use the package manager [npm](https://docs.npmjs.com) to install all the dependecies.

You have to do it in the api and Guetta-WebApp directories.

```bash
npm install 
```

## Usage

You can do it in two different ways:

the first is like a develop mode. You can see the outputs in the terminal.

open two terminals, one of them on api directory and the other one on Guetta-WebApp and then use this command on each terminal.

```bash
npm start
```

The other mode open the app like a process. in one terminal use.

```bash
cd api
pm2 start server.js
cd ../Guetta-webApp
pm2 start src/App.js
```
See the [user guide](https://github.com/MarcEnGit/Guetta/blob/0171c4d00f477cff1356cb2d2dba4b3861d13754/User%20Guide.pdf) to know how to use app.

## References
Specials thanks to Demucs, all AI procces use to split the songs is made with [Demucs](https://github.com/facebookresearch/demucs).

## License
[MIT](https://choosealicense.com/licenses/mit/)

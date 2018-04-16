const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({
    dest: 'public/uploads/'
})
const port = 3000;
const app = express();

const uploaded_files = [];

app.use(express.static('public'));
app.use(express.static('./public/uploads/'));

app.get('/photos', function (req, res) {
    res.statusCode = 200;
    const path = './public/uploads';

    fs.readdir(path, function (err, items) {
        let content = '';
        for (var i = 0; i < items.length; i++) {
            content += `<img src='${items[i]}' alt='pic'>`;
        }

        res.send(`
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>Kenziegram</title>
    </head>
    <body>
    <header><h1>KENZIEGRAM</h1></header>
    <form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
            
                <input type="file" id="file" name="myFile" value="file">
                <input type="submit" class="button" id="upload" value="upload">
           
        </form>
        <div class="content">
         ${content}
         <div>
    </body>
        `);

    });
});

app.post('/upload', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    // req.body will hold the text fields, if there were any
    console.log("Uploaded: " + req.file.filename);
    uploaded_files.push(req.file.filename);
    res.end("<a href='http://localhost:3000/photos'>Go to your photos! ");
})



app.listen(port);
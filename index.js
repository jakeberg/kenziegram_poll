const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({
    dest: 'public/'
})
const port = 3000;
const app = express();

const uploaded_files = [];

app.use(express.static('./public/uploads/'));

app.get('/photos', function (req, res) {
    res.statusCode = 200;

    const path = './public/uploads';
    fs.readdir(path, function (err, items) {
        console.log(items[1]);


        res.send(`<h1>Welcome to Kenziegram!</h1>
     
        <img src="${items[1]}" alt="moon" height="100" width="150">
        `);
    });
});



// app.post('/upload', upload.single('myFile'), function (req, res, next) {
//     // req.file is the `myFile` file
//     // req.body will hold the text fields, if there were any
//     console.log("Uploaded: " + req.file.filename);
//     uploaded_files.push(req.file.filename);
//     res.end("Uploaded file!");
//   })

app.listen(port);
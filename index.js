const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({
    dest: 'public/uploads/'
})
const port = 3000;
const app = express();

const uploaded_files = [];

app.set('view engine', 'pug');
app.set('views', './public/views')
app.use(express.static('public'));
app.use(express.static('./public/uploads/'));


app.get('/photos', function (req, res) {
    res.statusCode = 200;
    const path = './public/uploads';

    fs.readdir(path, function (err, items) {
        res.render('index', {
            title: 'Kenziegram',
            message: 'Kenziegram',
            url: items
        });
    });
});

app.post('/upload', upload.single('myFile'), function (req, res, next) {

    uploaded_files.push(req.file.filename);
    res.render('upload', {
        title: 'Kenziegram',
        message: 'Kenziegram',
        image: req.file.filename
    });
})

app.listen(port);

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({
    dest: 'public/uploads/'
})
const port = 3000;
const app = express();

const now = Date.now();
const uploaded_files = [];
const latest_images = {
    "images": [],
    "timestamp": ''
};

app.set('view engine', 'pug');
app.set('views', './public/views')
app.use(express.static('public'));
app.use(express.static('./public/uploads/'));

app.get('/update', function (req, res) {
    res.statusCode = 200;
    const path = './public/uploads';
    
    fs.readdir(path, function (err, items) {
        for (var pic in items) {
            let filename = items[pic]
            var modified = fs.statSync(path + "/" + filename).mtimeMs;
            if(modified > now && !latest_images.images.includes(filename)) {
                latest_images.images.push(filename);
                latest_images.timestamp = modified;
                console.log(latest_images);
                res.send(latest_images)
            }
        }
    });
});

app.get('/index', function (req, res) {
    res.statusCode = 200;
    const path = './public/uploads';

    fs.readdir(path, function (err, items) {
        res.render('index', {
            title: 'Kenziegram',
            message: 'Kenziegram',
            url: items,
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
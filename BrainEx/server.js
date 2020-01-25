//Add packages
var express = require('express');
var app = express();
var multer = require('multer');
var cors = require('cors');

//cors configuration
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
//app.use(express.static(__dirname + "/public"));

//add files uploaded to the UI into a folder named PreprocessedDataFiles with original file name
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'PreprocessedDataFiles')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
});

//upload multiple files at once
var upload = multer({ storage: storage }).array('file');

app.get('/',function(req,res){

    res.render(__dirname + '/public/index.html')

});

app.post('/upload',function(req, res) {
    console.log(req.body);

    //upload files and send error messages to console if any
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file) //file must be the same name as the
        // "name" property in SelectNewDataset.js for choosing a file
    })
});

//Run on specific port
app.listen(8000, function() {
    console.log('App running on port 8000');
});


//Add packages
let express = require('express');
let app = express();
let multer = require('multer');
let cors = require('cors');
let bodyParser = require('body-parser')



app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

//add files uploaded to the UI into a folder named PreprocessedDataFiles with original file name
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'preprocessed_datasets')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname ) // this decides what the file will be saved as
    }
});

//upload multiple files at once
let upload = multer({ storage: storage }).array('file');

// serve up the main app
app.get('/',function(req,res){
    res.render(__dirname + '/public/index.html')
});

// send files to the front-end
app.get('/preprocessed_files', function(req,res){
    res.send(preprocessed_files);
});

app.post('/upload',function(req, res) {
    console.log(req.body);
    console.log(res.body);
    //upload files and send error messages to console if any
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file) //file must be the same name as the
        // "name" property in .js for choosing a file
    })
});

//Run on specific port
app.listen(8000, function() {
    console.log('App running on port 8000');
});

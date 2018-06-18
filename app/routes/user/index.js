var express = require('express');
var router = express.Router();
let app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
let path = require('path');
var url = 'mongodb://localhost:27017/myproject';

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});

console.log('index.js loaded');

router.get('/', function(req, res){
res.sendFile('views/index.html', { root: 'public' });
})

router.post('/fileUpload', upload.single('image'), (req, res, next) => {
  console.log('req.body:', req.body)
  console.log('req.file:', req.file)

    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        insertDocuments(db, 'public/images/uploads/' + req.file.filename, () => {
            db.close();
            res.json({'message': 'File uploaded successfully'});
        });
    });
});



module.exports = router;

var insertDocuments = function(db, filePath, callback) {
    var collection = db.collection('user');
    collection.insertOne({'imagePath' : filePath }, (err, result) => {
        assert.equal(err, null);
        callback(result);
    });
}

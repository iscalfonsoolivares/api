const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const keys = require('../config/keys');

console.log('keys.s3Endpoint :', keys.s3Endpoint);

const spacesEndpoint = new aws.Endpoint(keys.s3Endpoint);

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

const uploader = multer({
  storage: multerS3({
    s3,
    bucket: keys.bucketName,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: file.fieldname,
      });
    },
    key: (request, file, cb) => {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
}).single('upload-input');

module.exports = app => {
    app.post('/api/uploads', uploader, (req, res) => {
        res.json({file: req.file});
    });
}
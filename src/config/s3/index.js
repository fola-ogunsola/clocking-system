import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import config from '../index';


var s3 = new aws.S3({
    region: config.CLOCKING_SYSTEM_AMAZON_S3_BUCKET_REGION,
    accessKeyId: config.CLOCKING_SYSTEM_AMAZON_S3_ACCESS_KEY_ID,
    secretAccessKey: config.CLOCKING_SYSTEM_AMAZON_S3_SECRET_ACCESS_KEY,
    signatureVersion: config.CLOCKING_SYSTEM_AWS_SIGNATURE_VERSION,
})

var storage = multerS3({
    s3: s3,
    bucket: config.CLOCKING_SYSTEM_AWS_BUCKET,
    acl: 'public-read',
    metadata: function (req, file, cb) {
        console.log(req.file, '------------------------')
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        console.log(Date.now().toString() + '_' + file.originalname);
        cb(null, Date.now().toString() + '_' + file.originalname)
    }
})

var upload = multer({ storage: storage })
    
    
export default upload
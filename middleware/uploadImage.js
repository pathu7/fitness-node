const fs = require('fs');

if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
}
if (!fs.existsSync('./public/images')) {
    // console.log('hi');
    fs.mkdirSync('./public/images');
}
if (!fs.existsSync('./public/images/profile')) {
    // console.log('hi');
    fs.mkdirSync('./public/images/profile');
}
if (!fs.existsSync('./public/images/exercise')) {
    // console.log('hi');
    fs.mkdirSync('./public/images/exercise');
}
if (!fs.existsSync('./public/images/community')) {
    // console.log('hi');
    fs.mkdirSync('./public/images/community');
}

const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('file',file);
        if (file.fieldname === 'profilePicture') {
            cb(null, './public/images/profile');
        }
        else if (file.fieldname === "exerciseImage") {
            // console.log('image');
            cb(null, './public/images/exercise');
        } else if (file.fieldname === "exerciseVideo") {
            // console.log('video');
            cb(null, './public/video/exercise');
        } else if (file.fieldname === "communityImage") {
            // console.log('video');
            cb(null, './public/images/community');
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    },
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    }
});
const fileFilter = (req, file, cb) => {
    // console.log("Hello");
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports.profileImage = multer({ storage: fileStorage, fileFilter: fileFilter }).single('profileImage');
module.exports.communityImage = multer({ storage: fileStorage, fileFilter: fileFilter }).single('communityImage');
module.exports.exerciseMedia = multer({ storage: fileStorage, fileFilter: fileFilter }).fields([{ name: 'exerciseImage', maxCount: 1 }, { name: 'exerciseVideo', maxCount: 1 }]);
import multer from 'multer';

// this code get the file form client and store it in the server in public/temp folder and then we will upload it to cloudinary and then delete it from the server.

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage });
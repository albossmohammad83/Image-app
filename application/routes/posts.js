var express = require('express');
var router = express.Router();
var db = require("../config/database");
const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostError = require('../helpers/debug/error/PostError');
const { route } = require(".");
const PostModel = require('../models/Posts');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

 const uploader = multer({storage: storage});

router.post('/createPost', uploader.single("uploadImage"),(req, res, next) => {
    let fileUploaded = req.file.path;
    console.log(fileUploaded);
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;
    if(fk_userId != null){
        req.flash("success", "You are logged in you can upload photos");
    }else{
        throw new PostError("You must be logged in!!  Post could not be created!!", "/postImage", 200);
    }

    /**
     * do server validation
     * if values used for insert statement are undefined
     * mysql.query or execute will fail
     * BIND parameters cannot be defined
     */

    sharp(fileUploaded)
        .resize(200)
        .toFile(destinationOfThumbnail)
        .then(() => {
            return PostModel.create(
                title,
                description,
                fileUploaded,
                destinationOfThumbnail,
                fk_userId,
            );
        })
        .then((postWasCreated) => {
            if(postWasCreated){
                req.flash("success", "Your post was created successfully");
                res.redirect("/");
            }else{
                throw new PostError("Post could not be created!!", "/postImage", 200);
            }
        })
        .catch((err) => {
            if(err instanceof PostError){
                errorPrint(err.getMessage());
                req.flash("error", err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            }else{
                next(err);
            }
        });
});
//localhost:3000/posts/search?search=value
router.get('/search', async (req, res, next) => {
    try {
        let searchTerm = req.query.search;
        if (!searchTerm) {
            res.send({
                message: "No search term given",
                results: []
            });
        } else {
            let results = await PostModel.search(searchTerm);
            if (results.length) {
                res.send({
                    message: `${results.length} results found`,
                    results: results
                });
            } else {
                let results = await PostModel.getNRecentPosts(8);
                res.send({
                    message: "No results where found for your search but here are the 8 most recent posts",
                    results: results
                });
            }
        }
    } catch (err) {
        next(err);

    }
});

module.exports = router;
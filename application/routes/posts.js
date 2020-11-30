var express = require('express');
var router = express.Router();
var db = require("../config/database");
const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostError = require('../helpers/debug/error/PostError');
const { route } = require('.');

var storage = multer.diskStorage({
   /* destination: function (req, file, cb) {
        console.log("Dest");
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }*/
});

var uploader = multer({storage: storage});

router.post('/createPos', uploader.single("uploadImage"),(req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;
});
//localhost:3000/posts/search?search=value
router.get('/search', (req, res, next) => {
    let searchTerm = req.query.search;
    if(!searchTerm){
        res.send({
            resultsStatus: "info",
            message:"No search term given",
            results: []
        });
    }else{
        let baseSQL = 'SELECT id, title, description, thumbnail, concat_ws(\' \', title,\
         description) AS haystack\
         FROM posts\
         HAVING haystack like ?;';
        let sqlReadySearchTerm = "%"+searchTerm+"%";
        db.execute(baseSQL, [sqlReadySearchTerm])
            .then(([results, fields]) => {
                if(results && results.length){
                    res.send({
                        resultsStatus:"info",
                        message: `${results.length} results found`,
                        results: results
                    });
                }else{
                    db.query('SELECT id, title, description, thumbnail, created FROM posts ORDER BY created DESC LIMIT 8', [])
                        .then(([results, fields]) => {
                            res.send({
                                resultsStatus:"info",
                                message: "No results where found for your search but here are the 8 most recent posts",
                                results: results
                            });
                        })

                }
            })
            .catch((err) => next(err))
    }
});
module.exports = router;
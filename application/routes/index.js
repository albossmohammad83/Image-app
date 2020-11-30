var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
var getRecentPosts = require('../middleware/postsmiddleware').getRecentPosts;
var db = require('../config/database');

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index',{title:"instructor APP"});
});

router.get('/login',(req, res, next) => {
  res.render("login",{title:"Log IN"})
});

router.get('/registration',(req, res, next) => {
  res.render("registration",{title:"Registration"})
});

router.get('/postimage',(req, res, next) => {
  res.render("postimage",{title:"Post Image"})
});


router.get('/post/:id(\\d+)',(req, res, next) => {
  let baseSQL =
      "SELECT u.username, p.title, p.description, p.photopath, p.created\
  FROM users u\
  JOIN posts p\
  ON u.id = fk_userid\
  WHERE p.id=?;";

  let postId = req.params.id;
  db.execute(baseSQL, [postId])
      .then(([results, fields]) =>{
        if(results && results.length){
          let post = results[0];
          res.render('imagepost', {currentPost: post});

        }else{
          req.flash('error','This is not the post you are looking for!');
          res.redirect('/');
        }
      })


});
/* moved to routes/Posts.js
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
*/
module.exports = router;

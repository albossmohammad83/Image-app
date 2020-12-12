var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
var {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware');
var db = require('../config/database');

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index',{title:"Photo APP"});
});

router.get('/login',(req, res, next) => {
    res.render("login",{title:"Log IN"})
});

router.get('/registration',(req, res, next) => {
  res.render("registration",{title:"Registration"})
});
router.use('/postimage', isLoggedIn);
router.get('/postimage',(req, res, next) => {
  res.render("postimage",{title:"Post Image"})
});


router.get('/post/:id(\\d+)',getPostById, getCommentsByPostId, (req, res, next) => {
    res.render('imagepost', {title: `Post ${req.params.id}`});
});

router.get('/getPost/:id(\\d+)',getPostById,getCommentsByPostId, (req, res, next) => {
    res.render('imagepost', {title: `Post ${req.params.id}`});

});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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

router.get('/imagepost',(req, res, next) => {
  res.render("imagepost",{title:"Image Post"})
});

module.exports = router;

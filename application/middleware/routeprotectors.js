const { successPrint, errorPrint} = require("../helpers/debug/debugprinters");
const routeProtectors = {};



//express-rev-request -> mw1 -> mw2 -> mw3 -> ... -> mwN -> router.HTTTPVERB
routeProtectors.userIsLoggedIn = function (req, res, next) {
    if(req.session.username){
        successPrint('User is logged in');
        next();
    } else {
        errorPrint('User is not logged in!');
        req.flash('error', 'you must be logged in to create a Post!');
        res.redirect('/login');
    }
}



module.exports = routeProtectors;
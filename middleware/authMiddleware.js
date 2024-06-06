const jwt = require('jsonwebtoken');


const renderAuth = (req, res, next)=> {
    const token = req.cookie.jwt;

    // check jwt exists & is verified
    if(token) {
        jwt.verify(token, 'Adimbrugh secret', (err, decodedToken)=> {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
} 

//check current user
const checkUser = (req, res, next)=> {
    const token = req.cookie.jwt;

    if(token) {
        jwt.verify(token, 'Adimbrugh secret', async (err, decodedToken)=> {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    renderAuth,
    checkUser
}
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

// This authentication will be set in the posts router to all routes 
// as only single user must be able to perform CRUD ops for his account
// Note : Every user gets a unique jwt token

async function authenticationMiddleware(req,res,next){
    const token = req.cookies.jwt  // cookie parser middleware method to access incoming cookies
    if(!token)
        throw new UnauthenticatedError("No Token provided");
    
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        const {userId,username,isAdmin} = payload;
        req.user = {userId,username,isAdmin};
    }catch(err){
        throw new UnauthenticatedError("Not allowed to access this route")
    }
    next();
}
module.exports = authenticationMiddleware;
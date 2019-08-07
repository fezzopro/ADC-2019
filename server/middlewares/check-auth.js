const jwt = require('jsonwebtoken');
module.exports = (request, response, next)=>{
    try {
        let decodedToken = jwt.verify(request.headers.authorization.split(" ")[1],process.env.JWT_KEY);
        request.userData = decodedToken;
        next();
        
    } catch (error) {
        return response.status(401).json({
            status:401,
            message: "unauthenticated request"
        });
    }
};
const jwt = require('jsonwebtoken');
const User = require('../model/user.model')

class Auth{
   constructor(){
      
   } 

   async isAuth(req,res,next){
    try {
        const sessionId = req.session.token;
        //console.log(req.session)
        if(!sessionId){
            res.status(400).json({
                success:false,
                message:"Please login to access resource"
            })
            return ;
        }
        const decodedData = jwt.verify(sessionId,process.env.JWT_SECRET);
        let userData = await User.findById(decodedData.id).select("+sessionID");
        //console.log(userData)
        if(!userData || !userData.sessionID ||userData.sessionID !=sessionId){
            res.status(400).json({
                success:false,
                message:"Session Expire"
            })
            return ;
        }

        req.user =userData
        next();

    } catch (error) {
        res.status(500).json({
            success:true,
            message:error.message
        })
    }
   }
}
module.exports =Auth
const jwt = require('jsonwebtoken');
const User = require('../DB/models/user');
import { Response ,NextFunction} from 'express';
const userAuth = async (req:any,res:Response,next:NextFunction)=>{
    try{
        const token = req.header('Authorization').replace('bearer ', '').trim()
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)    
        const user = await User.findById(decoded._id)  
        if(!user){
            throw new Error('User Not Found')
        }
        req.user = user;    
        next()
    }catch(e:any){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"UnAuthorized User"
        })
    }
}
module.exports = userAuth;
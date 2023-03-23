import express, {Request, Response , Router,NextFunction} from 'express';
import { User } from '../../frontend/src/app/services/global.service';
const { userController } = require("../controllers/index")
const router : Router = express.Router();
const asycnWrapper = require('../lib/index');

const Users = require('../DB/models/user');
const userAuth = require("../middlewares/userAuth");

router.post("/",async (req:Request,res:Response, next:NextFunction) => {
    const { body: { fullName, email, password } } = req;    
    const user = userController.create({fullName, email, password});
    const [err, data] = await asycnWrapper(user);
    if (err) return next(err);
    res.status(200).json(data);
})
router.get("/",async (req:Request,res:Response, next:NextFunction) => {
    const user = userController.get();
    const [err, data] = await asycnWrapper(user);
    if (err) return next(err);
    res.status(200).json(data);
});
router.post("/login",async (req:Request,res:Response, next:NextFunction) => {
    const { email , password } = req.body;
    try {
        const user = await Users.login(email,password);
        const token = await user.generateToken();    
        const data = { user, token}
        res.status(200).json(data);
    } catch (e:any) {
        return next(e);
    }

});
router.get("/me",userAuth,async (req:any,res:Response, next:NextFunction) => { 
    try {
        const data = req.user;
        res.status(200).json(data);
    } catch (e:any) {
        return next(e);
    }
});
module.exports = router;
import {Schema,model} from 'mongoose';
const validator = require('validator');
import { User } from "../schemaTypes"
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const schema = new Schema<User>({
    fullName:{
        type:String,
        minLength:6,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        match:/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
        
        validate(value:string){
            if(value.includes("password")){
                throw new Error("Password cannot contain 'password'")
            }else if(!value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/)){
                throw new Error("Password must contain at least one number , Capital letter and one special character")
            }
        },
    },  
},{
    timestamps:true
})
schema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
}
schema.pre("save",async function(){
    if(this.isModified("password"))
         this.password = await bcryptjs.hash(this.password,10);
})
schema.statics.login = async function(email,password){
    const userData = await User.findOne({email});
    if(!userData) throw new Error("Invalid email");
    const isMatched= await bcryptjs.compareSync(password,userData.password)
    if(!isMatched) throw new Error("Invalid Password");
   return userData;
}
schema.methods.generateToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    return token;
}
const User = model("Users",schema);

module.exports = User;
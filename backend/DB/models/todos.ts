import mongoose,{Schema,model} from 'mongoose';
const validator = require('validator');
import { Todo } from "../schemaTypes"
const bcryptjs = require('bcryptjs');

const schema = new Schema<Todo>({
    _id:{
        type:Number,
        required:true
    },
    todo:{
        type:String,
        minlength:5,
        maxlength:150,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },  
    completed:{
        type:Boolean,
        default:false,        
    },
    isDeleted:{
        type:Boolean,
        default:false,
    }, 
    isFavorite:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
})

const Todo = model("Todos",schema);

module.exports = Todo;
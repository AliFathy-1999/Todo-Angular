import { ObjectId } from 'mongoose';
import { Todo } from "../DB/schemaTypes";

const Todos = require('../DB/models/todos');

const create = (data:Todo) => Todos.create(data) 
const getUserTodos = (id:ObjectId) : Todo => { return Todos.find({userId:id}) }
const deleteById  = (userId:ObjectId,id:number) => { 
    return Todos.findOneAndUpdate({
        $and:[
            {_id: id},
            {userId}
        ],
    },
        {isDeleted:true},{new:true}
    )
 }
module.exports = {
    create,
    getUserTodos,
    deleteById
}
import { ObjectId } from 'mongoose';
import { Todo } from "../DB/schemaTypes";

const Todos = require('../DB/models/todos');

const create = (data:Todo) => Todos.create(data) 
const getUserTodos = (id:ObjectId) : Todo => { 
    return Todos.find({
        $and:[
            {userId:id},
            {isDeleted:false}
        ]
    })
 }
const deleteTodo  = (userId:ObjectId,id:number) => { 
    return Todos.findOneAndUpdate({
        $and:[
            {_id: id},
            {userId:userId}
        ],
    },
        {isDeleted:true},{new:true}
    )
 }
 const favoriteTodo = (userId:ObjectId,id:number) => { 
    return Todos.findOneAndUpdate({
        $and:[
            {_id: id},
            {userId},
            {isDeleted:false}
        ],
    },
        {isFavorite:true},{new:true}
    )
}
const unFavoriteTodo = (userId:ObjectId,id:number) => { 
    return Todos.findOneAndUpdate({
        $and:[
            {_id: id},
            {userId},
            {isDeleted:false}
        ],
    },
        {isFavorite:false},{new:true}
    )
}
const completeTodo = (userId:ObjectId,id:number) => {
    return Todos.findOneAndUpdate(
        {
            $and:[
                {_id: id},
                {userId:userId},
            ]
        },
        {$set:{completed:true}},
        {new:true}
    )
}
const uncompleteTodo = (userId:ObjectId,id:number) => {
    return Todos.findOneAndUpdate(
        {
            $and:[
                {_id: id},
                {userId:userId},
            ]
        },
        {$set:{completed:false}},
        {new:true}
    )
}
const myFavoriteTodo = (userId:ObjectId) => {
    return Todos.find({
        $and:[
            {userId},
            {isFavorite:true}
        ]
    });
}

const myCompletedTodo = (userId:ObjectId) => {
    return Todos.find({
        $and:[
            {userId},
            {completed:true},
        ]
    });
}
const myDeletedTodo = (userId:ObjectId) => {
    return Todos.find({
        $and:[
            {userId},
            {isDeleted:true}
        ]
    });
}
module.exports = {
    create,
    getUserTodos,
    deleteTodo,
    favoriteTodo,
    unFavoriteTodo,
    completeTodo,
    uncompleteTodo,
    myFavoriteTodo,
    myCompletedTodo,
    myDeletedTodo
}
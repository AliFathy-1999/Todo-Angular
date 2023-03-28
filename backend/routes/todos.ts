import express, {Request, Response , Router,NextFunction} from 'express';
const router : Router = express.Router();
const asycnWrapper = require('../lib/index');
const  todosController  = require("../controllers/todos")
const Counter = require('../DB/models/counter');
const userAuth = require("../middlewares/userAuth");
router.post("/",userAuth,async (req:any,res:Response, next:NextFunction) => {
    const incrementalId = await Counter.findOneAndUpdate(
        {id:"autoInc"},
        { $inc: { seq: 1 } },
        { new: true}
      );
    let _id;    
    if(incrementalId == null) {
        Counter.create({id:"autoInc",seq:1})
        _id=1
    }else{
        _id = incrementalId.seq;
    }
    const { body: { todo } } = req;
    const mytodo = todosController.create({ _id, userId:req.user, todo});
    const [err, data] = await asycnWrapper(mytodo);
    if (err) return next(err);
    res.status(200).json(data);
})

router.get("/",userAuth,async (req:any,res:Response, next:NextFunction) => {
    const todos  = todosController.getUserTodos(req.user._id);    
    const [err, data] = await asycnWrapper(todos);
    if (err) return next(err);
    res.status(200).json(data);
})
router.patch("/deletetodo/:id", userAuth ,async (req:any,res:Response, next:NextFunction) => {
    const { params:{ id } } = req;
    const userId = req.user._id
    const todo = todosController.deleteTodo(userId,id);
    const [err, data] = await asycnWrapper(todo);
    if (err) return next(err);
    res.status(200).json(data);
})
router.patch("/undeletetodo/:id", userAuth ,async (req:any,res:Response, next:NextFunction) => {
    const { params:{ id } } = req;
    const userId = req.user._id
    const todo = todosController.unDeleteTodo(userId,id);
    const [err, data] = await asycnWrapper(todo);
    if (err) return next(err);
    res.status(200).json(data);
})
router.patch("/favoritetodo/:id", userAuth ,async (req:any,res:Response, next:NextFunction) => {
    const { params:{ id } } = req;
    const userId = req.user._id
    const todo = todosController.favoriteTodo(userId,id);
    const [err, data] = await asycnWrapper(todo);
    if (err) return next(err);
    res.status(200).json(data);
})
router.patch("/unfavoritetodo/:id", userAuth ,async (req:any,res:Response, next:NextFunction) => {
    const { params:{ id } } = req;
    const userId = req.user._id
    const todo = todosController.unFavoriteTodo(userId,id);
    const [err, data] = await asycnWrapper(todo);
    if (err) return next(err);
    res.status(200).json(data);
})
router.patch("/completetodo/:id", userAuth ,async (req:any,res:Response, next:NextFunction) => {
    const { params:{ id } } = req;
    const userId = req.user._id
    const todo = todosController.completeTodo(userId,id);
    const [err, data] = await asycnWrapper(todo);
    if (err) return next(err);
    res.status(200).json(data);
})
router.patch("/uncompletetodo/:id", userAuth ,async (req:any,res:Response, next:NextFunction) => {
    const { params:{ id } } = req;
    const userId = req.user._id
    const todo = todosController.uncompleteTodo(userId,id);
    const [err, data] = await asycnWrapper(todo);
    if (err) return next(err);
    res.status(200).json(data);
})
router.get("/favoritetodo", userAuth ,async (req:any,res:Response, next:NextFunction) => {
    const userId = req.user._id
    const todo = todosController.myFavoriteTodo(userId);
    const [err, data] = await asycnWrapper(todo);
    if (err) return next(err);
    res.status(200).json(data);
})
router.get("/completedtodo/:id", userAuth ,async (req:any,res:Response, next:NextFunction) => {
    const { params:{ id } } = req;
    const userId = req.user._id
    const todo = todosController.completedTodo(userId,id);
    const [err, data] = await asycnWrapper(todo);
    if (err) return next(err);
    res.status(200).json(data);
})
router.get("/deletedtodo", userAuth ,async (req:any,res:Response, next:NextFunction) => {
    const userId = req.user._id
    const todo = todosController.myDeletedTodo(userId);   
    const [err, data] = await asycnWrapper(todo);
    if (err) return next(err);
    res.status(200).json(data);
})
router.get("/singletodo/:id", userAuth ,async (req:any,res:Response, next:NextFunction) => {
    const { params:{ id } } = req;
    const userId = req.user._id
    const todo = todosController.singleTodo(userId,id);
    const [err, data] = await asycnWrapper(todo);
    if (err) return next(err);
    res.status(200).json(data);
})
module.exports = router;
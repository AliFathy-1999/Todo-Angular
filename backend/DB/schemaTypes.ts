import mongoose,{ Types } from 'mongoose';
type User = {
  fullName:string,
  email:string,
  password:string,
}
type Todo = {
  _id:number,
  todo:string,
  userId:mongoose.Types.ObjectId,
  completed:boolean,
  isDeleted:boolean,
  isFavorite:boolean
}

export { User ,Todo };
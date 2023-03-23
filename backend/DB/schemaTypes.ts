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
  isDeleted:boolean,
  isFavorite:boolean
}

export { User ,Todo };
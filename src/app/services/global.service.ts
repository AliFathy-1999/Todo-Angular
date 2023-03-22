import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
export interface User{
  name:string,
  quote:string,
}
export interface Todo {
  id:number,
  todo:string,
  completed:boolean,
  isFavorite:boolean,
  isDeleted:boolean
}
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public isLoggedIn : boolean = false;
  public navbar : boolean = false;
  public footer : boolean = false;
  public task:any;
  user:User = {
    name:"",
    quote:""
  }
  todos:Todo[] = []
  todoBody:string = ''
  isCompleted :Boolean = false;
  errorMessage:string = ""
  constructor(private _router:Router) {

  }
  isAuthenticated(){
    return this.isLoggedIn;
  }
  getUser(){
    return this.user;
  }
  getTasks(){
    return this.todos;
  }


}

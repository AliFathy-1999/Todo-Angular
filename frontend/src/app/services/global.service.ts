import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface User{
  fullName?:string,
  email:string,
  password:string,
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
  public countFavTasks:number = 0;
  user:any;
  url:string="http://localhost:5005/users/"

  todos:Todo[] = []
  todoBody:string = ''
  isCompleted :Boolean = false;
  errorMessage:string = ""
  constructor(private _router:Router,private http:HttpClient) {

  }
  login(user:User){
    return this.http.post(`${this.url}login`,user);
  }
  register(user:User){
    return this.http.post(`${this.url}register`,user);
  }
  // myTasks():Todo[]{
  //   return
  // }
  isAuthenticated(){
    return this.isLoggedIn;
  }
  getUser(){
    return this.user;
  }
  getTasks(){
    return this.todos;
  }
  getDeletedTasks(){
    return this.todos.filter(todo => todo.isDeleted);
  }
  getFavoriteTasks(){
    return this.todos.filter(todo => todo.isFavorite);
  }
  getCountFav(){
    const count = this.todos.filter(todo => todo.isFavorite == true)
    return count.length;
  }
  getCountDel(){
    const count = this.todos.filter(todo => todo.isDeleted == true)
    return count.length;
  }
  getCompTaskPercent(){
    const TasksLen = this.todos.filter(todo => todo.isDeleted == false).length
    const compTasksLen : number = this.todos.filter(todo => todo.completed == true && todo.isDeleted == false).length
    if(TasksLen)
      return ((compTasksLen/TasksLen)*100).toFixed(2);
    else
      return 0;
  }
}

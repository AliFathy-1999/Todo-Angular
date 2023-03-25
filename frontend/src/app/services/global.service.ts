import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, scan } from 'rxjs';
export interface User{
  fullName?:string,
  email:string,
  password:string,
}

export interface Todo {
  _id:number,
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
  url:string = "http://localhost:5005/users/"
  todourl:string = "http://localhost:5005/todos/"
  todos:Todo[] = []
  todoBody:string = ''
  isCompleted :Boolean = false;
  errorMessage:string = ""
  delCount:number = 0
  constructor(private _router:Router,private http:HttpClient) {

  }
  login(user:User){
    return this.http.post(`${this.url}login`,user);
  }
  register(user:User){
    return this.http.post(`${this.url}register`,user);
  }
  getMe(){
    return this.http.get(`${this.url}me`);
  }
  myTasks(){
    return this.http.get(`${this.todourl}`);
  }
  addTasks(todo:any){
    return this.http.post(`${this.todourl}`,todo);
  }
  deleteTask(id:number){
    return this.http.patch(`${this.todourl}deletetodo/${id}`,null)
  }
  completeTask(id:number){
    return this.http.patch(`${this.todourl}completetodo/${id}`,null)
  }
  unCompleteTask(id:number){
    return this.http.patch(`${this.todourl}uncompletetodo/${id}`,null)
  }
  favTask(id:number){
    return this.http.patch(`${this.todourl}favoritetodo/${id}`,null)
  }
  unFavTask(id:number){
    return this.http.patch(`${this.todourl}unfavoritetodo/${id}`,null)
  }
  getDeletedTasks(){
    return this.http.get(`${this.todourl}deletedtodo`)
  }
  getFavoriteTasks(){
    return this.http.get(`${this.todourl}favoritetodo/`)
  }
  getCountFav(){
    const count = this.todos.filter(todo => todo.isFavorite == true)
    return count.length;
  }
  // getCountDel(){
  //   return this.delCount;
  // }
  getCompTaskPercent(){
    const TasksLen = this.todos.filter(todo => todo.isDeleted == false).length
    const compTasksLen : number = this.todos.filter(todo => todo.completed == true && todo.isDeleted == false).length
    if(TasksLen)
      return ((compTasksLen/TasksLen)*100).toFixed(2);
    else
      return 0;
  }
}

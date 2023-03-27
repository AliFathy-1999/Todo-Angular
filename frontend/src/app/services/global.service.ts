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
  favCountSubject = new BehaviorSubject<number>(0);
  count$ = this.favCountSubject.asObservable();
  delCountSubject = new BehaviorSubject<number>(0);
  delcount$ = this.delCountSubject.asObservable();
  constructor(private _router:Router,private http:HttpClient) {

  }
  countFav(count:number){
    this.favCountSubject.next(count);
  }
  countDel(count:number){
    this.delCountSubject.next(count);
  }
  login(user:User):Observable<any>{
    return this.http.post(`${this.url}login`,user);
  }
  register(user:User):Observable<any>{
    return this.http.post(`${this.url}register`,user);
  }
  getMe():Observable<any>{
    return this.http.get(`${this.url}me`);
  }
  myTasks():Observable<any>{
    return this.http.get(`${this.todourl}`);
  }
  addTasks(todo:any):Observable<any>{
    return this.http.post(`${this.todourl}`,todo);
  }
  deleteTask(id:number):Observable<any>{
    return this.http.patch(`${this.todourl}deletetodo/${id}`,null)
  }
  completeTask(id:number):Observable<any>{
    return this.http.patch(`${this.todourl}completetodo/${id}`,null)
  }
  unCompleteTask(id:number):Observable<any>{
    return this.http.patch(`${this.todourl}uncompletetodo/${id}`,null)
  }
  favTask(id:number):Observable<any>{
    return this.http.patch(`${this.todourl}favoritetodo/${id}`,null)
  }
  unFavTask(id:number):Observable<any>{
    return this.http.patch(`${this.todourl}unfavoritetodo/${id}`,null)
  }
  getDeletedTasks():Observable<any>{
    return this.http.get(`${this.todourl}deletedtodo`)
  }
  getFavoriteTasks():Observable<any>{
    return this.http.get(`${this.todourl}favoritetodo/`)
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

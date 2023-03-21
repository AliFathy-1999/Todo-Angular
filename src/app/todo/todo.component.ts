import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
type Todo = {
    id:number,
    todo:string,
    completed:boolean,
}
type User = {
  name:string,
  quote:string,
}
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  user:User = {
    name:"",
    quote:""
  }
  todos:Todo[] = []
  todoBody:string = ''
  isCompleted :Boolean = false;
  errorMessage:string = ""
  task:Todo = {id:1,todo:"",completed:false}
  constructor(public _router:Router,public _global:GlobalService){
    _global.navbar = true;
    _global.footer = true;
    this.user = _global.getUser()
  }

  ngOnInit(): void {}
  addTask(todoBody:string){
    let task:Todo = {
      id:Date.now(),
      todo:todoBody,
      completed:false,
    }
    if(task.todo.length != 0){
      this.todos.push(task)
      this.errorMessage = ""
    }
    else{
      this.errorMessage = "Invalid Input"
    }

  }
  completeTask(id:number){
    this.todos.forEach(todo => {
      if(todo.id == id)
        todo.completed = true
    });
  }
  unCompleteTask(id:number){
    this.todos.forEach(todo => {
      if(todo.id == id)
        todo.completed = false
    });
  }
  deleteTask(id:number){
    const index : number= this.todos.findIndex(todo => todo.id == id)
    this.todos.splice(index,1);
  }
  favoriteTask(id:number){

  }
  sendTaskData(id:number){
    this._global.task =  this.todos.find(todo => todo.id == id);
  }

  gotoSingleTask(id:any){
       this._router.navigate(["/task",id])
  }
}

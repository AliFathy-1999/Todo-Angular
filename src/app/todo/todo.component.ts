import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService, User,Todo } from '../services/global.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  user:User
  errorMessage:string =""
  todos:Todo[]=[]
  @Input() myTodos:any
  completedTask:boolean = false
  @Output() deletedTodoEvent = new EventEmitter<string>();

  constructor(public _router:Router,public _global:GlobalService){
    _global.navbar = true;
    _global.footer = true;
    this.user = _global.getUser()
    this.todos = _global.getTasks()
    this.errorMessage = this._global.errorMessage;
  }

  ngOnInit(): void {}

  getTasks(){
    return this.todos;
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
    let index : number= this.todos.findIndex(todo => todo.id == id)
    this.todos.splice(index, 1);
    const todo = this.todos[index];
    console.log(todo);

    this.deletedTodoEvent.emit(todo.todo + ' deleted');

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

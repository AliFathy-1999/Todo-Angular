import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService, User,Todo } from '../services/global.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  errorMessage:string =""
  todos:Todo[]=[]
  @Input() myTodos:any
  completedTask:boolean = false
  @Output() deletedTodoEvent = new EventEmitter<string>();
  constructor(public _router:Router,public _global:GlobalService,private activated : ActivatedRoute){
    _global.navbar = true;
    _global.footer = true;
    this.errorMessage = this._global.errorMessage;

  }

  ngOnInit(): void {
    this._global.myTasks().subscribe((tasks:any) =>{
      this.todos = tasks;
    },(err:Error)=>{
      location.reload()
    },()=>{
    })
  }

  completeTask(id:number){
    this._global.completeTask(id).subscribe((tasks:any) =>{
      location.reload()
    })
  }
  unCompleteTask(id:number){
    this._global.unCompleteTask(id).subscribe((tasks:any) =>{
      location.reload()
    })
  }
  deleteTask(id:any){
    this._global.deleteTask(id).subscribe((todo:any) =>{
       location.reload()
       this.ngOnInit()
    })
    // const todo = this.todos.filter(todo => {
    //   if(todo.id == id)
    //     todo.isDeleted = true;
    // });
    // let index : number = this.todos.findIndex(todo => todo.id == id)
    // this.todos.splice(index, 1);
    // const todo = this.todos[index];
    // this.deletedTodoEvent.emit(todo + ' deleted');

  }
  favoriteTask(id:number){
    this._global.favTask(id).subscribe((todo:any)=>{
      location.reload()
    })
  }
  sendTaskData(id:number){
    //this._global.task =  this.todos.find(todo => todo.id == id);
  }

  gotoSingleTask(id:any){
       this._router.navigate(["/task",id])
  }

}

import { Component, OnInit } from '@angular/core';
type Todo = {
    id:number,
    todo:string,
    completed:boolean,
}
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  todoStorages:any =  localStorage.getItem("todos");
  todos:Todo[] = []
  todoBody:string = ''
  isCompleted :Boolean = false;
  errorMessage:string = ""
  constructor(){}

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
}

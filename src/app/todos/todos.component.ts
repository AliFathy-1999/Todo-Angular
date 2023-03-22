import { GlobalService, User,Todo } from 'src/app/services/global.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  user:User
  errorMessage:string =""
  todoBody:string=""
  todos:Todo[] = []
  deletedMessage:string="";
  deletedTodo: Todo | null = null;

  constructor(private  _global:GlobalService){
    _global.navbar = true;
    _global.footer = true;
    this.user = _global.getUser()
    this.todos = _global.getTasks()
  }
  addTask(todoBody:string){
    let task:Todo = {
      id:Date.now(),
      todo:todoBody,
      completed:false,
      isFavorite:false,
      isDeleted:false
    }
    if(task.todo.length != 0){
      this.todos.push(task)
      this._global.todos = this.todos
      console.log(this._global.todos);
      this.errorMessage = ""
    }
    else{
      this.errorMessage = "Invalid Input"
    }
  }
  handleDelete(todo: Todo) {
    this.deletedTodo = todo;
    setTimeout(() => {
      this.deletedTodo = null;
    }, 3000);
  }
}

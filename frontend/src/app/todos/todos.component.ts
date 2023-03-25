import { GlobalService, User,Todo } from 'src/app/services/global.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  errorMessage:string =""
  todoBody:string=""
  todos:Todo[] = []
  deletedMessage:string="";
  deletedTodo: Todo | null = null;
  isLoading:boolean = false
  todoForm: FormGroup = new FormGroup({
    todo:new FormControl('' , [Validators.required , Validators.minLength(5),Validators.maxLength(150)]),
  })
  constructor(private  _global:GlobalService){
    _global.navbar = true;
    _global.footer = true;
  }
  ngOnInit(): void {
    this._global.myTasks().subscribe((tasks:any) =>{
      this.todos = tasks;
      this.isLoading = false
    },(err:Error)=>{
      this.isLoading = true
      //location.reload()
    },()=>{

    })
  }
  addTask(form: FormGroup){
    this._global.addTasks(form.value).subscribe((tasks:any) =>{
        this.ngOnInit();
    },(err:Error)=>{
        //location.reload()
    })
  }
  // handleDelete(todo: Todo) {
  //   this.deletedTodo = todo;
  //   setTimeout(() => {
  //     this.deletedTodo = null;
  //   }, 3000);
  // }
}

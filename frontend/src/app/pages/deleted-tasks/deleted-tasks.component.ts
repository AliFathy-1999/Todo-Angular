import { GlobalService, Todo } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deleted-tasks',
  templateUrl: './deleted-tasks.component.html',
  styleUrls: ['./deleted-tasks.component.css']
})
export class DeletedTasksComponent implements OnInit{
  count = 0
  tasks:Todo[] = [{_id:1,todo:"",completed:false,isDeleted:false,isFavorite:false}]
  constructor(private _global:GlobalService){
    _global.navbar = true;_global.footer = true
  }
  ngOnInit(): void {

    this._global.getDeletedTasks().subscribe((task:any) =>{
      this.tasks = task
      this._global.countDel(task.length)
    },(err:Error) => {
      this.ngOnInit()
    })
  }
}

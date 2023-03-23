import { Component } from '@angular/core';
import { GlobalService, Todo } from 'src/app/services/global.service';

@Component({
  selector: 'app-favorite-tasks',
  templateUrl: './favorite-tasks.component.html',
  styleUrls: ['./favorite-tasks.component.css']
})
export class FavoriteTasksComponent {
  tasks:Todo[] = [{id:1,todo:"",completed:false,isDeleted:false,isFavorite:false}]
  constructor(private _global:GlobalService){
    _global.navbar = true;_global.footer = true
    this.tasks = _global.getFavoriteTasks()
  }
}

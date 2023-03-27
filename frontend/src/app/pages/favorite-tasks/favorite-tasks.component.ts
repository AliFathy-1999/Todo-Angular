import { Component, OnInit } from '@angular/core';
import { GlobalService, Todo } from 'src/app/services/global.service';

@Component({
  selector: 'app-favorite-tasks',
  templateUrl: './favorite-tasks.component.html',
  styleUrls: ['./favorite-tasks.component.css']
})
export class FavoriteTasksComponent implements OnInit{
  tasks:Todo[] = [{_id:1,todo:"",completed:false,isDeleted:false,isFavorite:false}]
  constructor(private _global:GlobalService){
    _global.navbar = true;_global.footer = true
  }

  ngOnInit(): void {
    this._global.getFavoriteTasks().subscribe((tasks:any) => {
      this._global.countFav(tasks.length)
      this.tasks = tasks
    },(err:Error) => {
      this.ngOnInit()
    })
  }
  unFavorite(id:number){
    this._global.unFavTask(id).subscribe((tasks:any) => {

      this.ngOnInit()
  })
  }
}

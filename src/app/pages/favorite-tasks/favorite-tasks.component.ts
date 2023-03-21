import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-favorite-tasks',
  templateUrl: './favorite-tasks.component.html',
  styleUrls: ['./favorite-tasks.component.css']
})
export class FavoriteTasksComponent {
  constructor(private _global:GlobalService){
    _global.navbar = true;_global.footer = true
  }
}

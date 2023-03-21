import { GlobalService } from 'src/app/services/global.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-deleted-tasks',
  templateUrl: './deleted-tasks.component.html',
  styleUrls: ['./deleted-tasks.component.css']
})
export class DeletedTasksComponent {
  constructor(private _global:GlobalService){
    _global.navbar = true;_global.footer = true
  }
}

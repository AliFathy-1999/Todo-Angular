import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent {
  id:number;
  task:any

  constructor(private _activited: ActivatedRoute,private _global:GlobalService){
    _global.navbar = true ; _global.footer = true ;
    this.id =  this._activited.snapshot.params['id']
    this.task = this._global.task
  }
}

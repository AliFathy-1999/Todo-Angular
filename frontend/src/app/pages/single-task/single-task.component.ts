import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent implements OnInit{
  id:number;
  task:any

  constructor(private _activited: ActivatedRoute,private _global:GlobalService){
    _global.navbar = true ; _global.footer = true ;
    this.id =  this._activited.snapshot.params['id']
  }
  ngOnInit(): void {
    this._global.getSingleTask(this.id).subscribe((task:any) =>{
      this.task= task;
    })
  }
}

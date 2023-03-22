import { GlobalService } from 'src/app/services/global.service';
import { Component } from '@angular/core';
type User = {
  name:string,
  quote:string,
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user:User = {
    name:"",
    quote:""
  }
  userLoggedIn:boolean = false
  constructor(public _global:GlobalService){
    this.userLoggedIn = _global.isLoggedIn;
    this.user = _global.getUser();
  }
  logout(){
    this._global.isLoggedIn = false
  }
  getCountFavorite(){
    return this._global.getCountFav();
  }
  getCountDelete(){
    return this._global.getCountDel();
  }
  getPercentage(){
    return this._global.getCompTaskPercent();
  }
}

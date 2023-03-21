import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
type User = {
  name:string,
  quote:string,
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name:string="";
  quote:string="";
  constructor(public _global:GlobalService,public _router:Router){
    _global.navbar=false;
    _global.footer=false;
  }
  login(name:string,quote:string){
    const userData : User = {
      name:name,
      quote:quote,
    }
    this._global.user = userData;
    this._global.isLoggedIn = true;
    this._router.navigate(['/todo'])
    console.log(this._global.user);

  }
}

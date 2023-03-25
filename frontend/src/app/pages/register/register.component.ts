import { Component } from '@angular/core';
import { User } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:User = {
    fullName:"",
    email:"",
    password:"",
  }
  errorMessage:string="";
  constructor(public _global:GlobalService,public _router:Router){
  }
  onSubmit(){
    this._global.register(this.user).subscribe(user => {
      console.log("Registered Successfully");

      this._router.navigate(['/login']);
    },(err:Error)=>{
      console.log(err.message);
      this.errorMessage = err.message;
    })
  }

}

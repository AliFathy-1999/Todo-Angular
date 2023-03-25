import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
export class LoginComponent implements OnInit {
  //Reactive Form
  userForm: FormGroup = new FormGroup({
    email:new FormControl('' , [Validators.required , Validators.email]),
    password:new FormControl('' , [Validators.required])
  })
  name:string="";
  quote:string="";
  errorMessage:string="";
  constructor(public _global:GlobalService,public _router:Router,private cookieService: CookieService){
    _global.navbar=false;
    _global.footer=false;
  }

  ngOnInit(): void {
  }
  login(name:string,quote:string){
    const userData : User = {
      name:name,
      quote:quote,
    }
    this._global.isLoggedIn = true;
    this._router.navigate(['/todos'])

  }
  onSubmit(form: FormGroup) {
    this._global.login(form.value).subscribe((user:any) => {
      this.cookieService.set('token', user.token);
      this._router.navigate(['/todos']);
    },(err:Error)=>{
      this.errorMessage = "Invalid email or password";
    })
  }
}

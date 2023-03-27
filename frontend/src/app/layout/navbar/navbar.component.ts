import { LoadingService } from './../../services/loading.service';
import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
type User = {
  name:string,
  quote:string,
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  fullName:string = ""
  userLoggedIn:boolean = false
  token:any;
  isLoading:Boolean = false
  favcount = 0
  delcount = 0
  constructor(public _global:GlobalService,private cookieService: CookieService,
    public loadingService:LoadingService,private router:Router){
    this.token = this.cookieService.get('token');
    if(this.token)
      this.userLoggedIn = true;
  }
  ngOnInit(): void {
    this._global.count$.subscribe((count:any) => {
      this.favcount = count;
    });
    this._global.delcount$.subscribe((count:any) => {
      this.delcount = count;
    });
    this._global.getMe().subscribe((user:any) =>{
      this.isLoading  = false;
      this.fullName =  user.fullName;
    },(err:Error)=>{
      this.isLoading  = true;
      location.reload();
    })
 // }
}

  logout(){
    this.cookieService.delete("token")
    this.router.navigate(['/login']);
  }
  getPercentage(){
    return this._global.getCompTaskPercent();
  }
}

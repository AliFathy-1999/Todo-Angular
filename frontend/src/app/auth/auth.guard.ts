import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: GlobalService, private router: Router,private cookieService: CookieService){};
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    let isLoggedIn = this.cookieService.get('token');
    if (isLoggedIn){
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

}

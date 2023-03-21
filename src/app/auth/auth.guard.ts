import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: GlobalService, private router: Router){};
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    let isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn){
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }

}

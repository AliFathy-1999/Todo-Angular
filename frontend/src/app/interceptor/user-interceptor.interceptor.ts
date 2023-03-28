import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
@Injectable()
export class UserInterceptorInterceptor implements HttpInterceptor {
  tokenCookies:string = this.cookieService.get('token');
  private totalRequests = 0;
  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.tokenCookies){
    const cloned = request.clone({
      headers: request.headers.set("Authorization","bearer " + this.tokenCookies)
    });
    return next.handle(cloned);
  }else {
    return next.handle(request);
  };

  }
}

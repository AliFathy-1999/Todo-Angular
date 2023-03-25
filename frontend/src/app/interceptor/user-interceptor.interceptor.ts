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
import { LoadingService } from '../services/loading.service';
@Injectable()
export class UserInterceptorInterceptor implements HttpInterceptor {
  tokenCookies:string = this.cookieService.get('token');
  private totalRequests = 0;
  constructor(private cookieService: CookieService,private loadingService : LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    if(this.tokenCookies){
    const cloned = request.clone({
      headers: request.headers.set("Authorization","bearer " + this.tokenCookies)
    });
    return next.handle(cloned);
  }else {
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  };

  }
}

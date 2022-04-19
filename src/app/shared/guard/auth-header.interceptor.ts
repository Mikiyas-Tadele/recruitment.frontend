import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/operators/';
import {Observable} from 'rxjs';
import {isNullOrUndefined} from 'util';

import { HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';


const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();

    if (this.token.getToken() != null) {
          authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
        }
return next.handle(authReq).pipe(tap(() => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login']);
            }
          }
        })
      );
  }
}

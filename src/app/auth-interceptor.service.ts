import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url !== 'Test') {
      console.log('Request is on its way');
      const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});
      console.log('Modified ' + modifiedRequest.headers);
      return next.handle(modifiedRequest)
      .pipe(tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log('Response Arrived, body data: ');
          console.log('Body ' + event.body);
        }
      }));
    } else {
      return next.handle(req);
    }
  }

constructor() { }

}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptorService  implements HttpInterceptor {

constructor() { }
intercept(req: HttpRequest<any>, next: HttpHandler) {
  console.log('Outgoing request logging');
  console.log(req.url);
  return next.handle(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log('logging response ');
        console.log('logging ' + event.body);
      }
    })
  );
}
}

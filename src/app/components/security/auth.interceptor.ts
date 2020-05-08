import { SharedService } from './../../services/shared.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private sharedEvento: boolean;

  constructor(
    private sharedService: SharedService
  ) {
    this.sharedService.evento.subscribe(
      (res) => this.sharedEvento = res
    )
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest: any;
    if (this.sharedEvento) {
      authRequest = req.clone({
        setHeaders: {
          'Authorization': localStorage.getItem('token')
        }
      });
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }

}

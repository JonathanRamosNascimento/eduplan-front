import { SharedService } from './../../services/shared.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  private sharedEvento: boolean;

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {
    this.sharedService.evento.subscribe(
      (res) => this.sharedEvento = res
    )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log(this.sharedEvento);
    if (this.sharedEvento) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}

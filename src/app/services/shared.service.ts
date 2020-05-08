import { UserService } from './user/user.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  public evento = new BehaviorSubject<any>(false);

  constructor() {
  }

}

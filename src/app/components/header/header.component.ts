import { SharedService } from './../../services/shared.service';
import { User } from './../../model/user';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User;

  constructor(
    private router: Router,
    private shared: SharedService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }

  signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.shared.evento.next(false);
    this.router.navigateByUrl('/login');
  }
}

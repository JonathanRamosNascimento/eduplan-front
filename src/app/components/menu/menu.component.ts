import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public user: User;

  constructor() {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}

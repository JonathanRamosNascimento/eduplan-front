import { UserService } from './services/user/user.service';
import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showTemplate: boolean = false;

  constructor(private shared: SharedService) {
    this.shared.evento.subscribe(
      (res) => this.showTemplate = res
    )
  }

  ngOnInit() {
  }

  showContentWrapper() {
    return {
      'content-wrapper': this.showTemplate
    }
  }

}

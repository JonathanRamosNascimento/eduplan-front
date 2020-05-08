import { CurrentUser } from './../../../model/currentUser';
import { SharedService } from './../../../services/shared.service';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {
  }

  ngOnInit() {
  }


  login() {
    this.message = '';
    this.userService.login(this.loginForm.value).subscribe((userAuthentication: CurrentUser) => {
      this.sharedService.evento.next(true);
      localStorage.setItem('token', userAuthentication.token);
      localStorage.setItem('user', JSON.stringify(userAuthentication.user));
      this.router.navigate(['/']);
    }, err => {
      this.sharedService.evento.next(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.message = 'Erro ';
    });
  }

  verificaValidTouched(campo) {
    return !this.loginForm.get(campo).valid && this.loginForm.get(campo).touched
  }

  verificaEmailInvalido() {
    let campoEmail = this.loginForm.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo): {} {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

}

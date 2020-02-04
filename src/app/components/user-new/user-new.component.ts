import { Router } from '@angular/router';
import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { SharedService } from './../../services/shared.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  usuarioForm: FormGroup = this.fb.group({
    'id': [null],
    'nome': ['', [Validators.required]],
    'matricula': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]],
    'password1': ['', [Validators.required, Validators.minLength(6)]],
    'profile': ['', [Validators.required]]
  }, { validators: this.verificaSenha });

  user = new User();
  shared: SharedService;
  message: {};
  classCss: {};
  id: string = this.route.snapshot.params['id'];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    if (this.id != undefined) {
      this.findById(this.id);
    }
  }

  findById(id: string) {
    this.userService.findById(id).subscribe((responseApi: ResponseApi) => {
      const user = { ...responseApi.data, password1: '', password: '' }
      this.usuarioForm.setValue(user);

    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  register() {
    this.message = {};
    this.userService.createOrUpdate(this.usuarioForm.value).subscribe((responseApi: ResponseApi) => {
      this.user = new User();
      this.usuarioForm.reset();
      this.router.navigate(['/user-list']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  verificaSenha(group: FormGroup) {
    const senha = group.controls['password'].value;
    const senha1 = group.controls['password1'].value;
    if (senha == senha1) {
      return null;
    }
    return { matching: false };
  }

  verificaValidTouched(campo) {
    return !this.usuarioForm.get(campo).valid && this.usuarioForm.get(campo).touched
  }

  verificaEmailInvalido() {
    let campoEmail = this.usuarioForm.get('email');
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

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }

}
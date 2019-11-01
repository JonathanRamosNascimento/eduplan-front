import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplinaService } from './../../services/disciplina/disciplina.service';
import { SharedService } from './../../services/shared.service';
import { Disciplina } from './../../model/disciplina';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-disciplina-new',
  templateUrl: './disciplina-new.component.html',
  styleUrls: ['./disciplina-new.component.css']
})
export class DisciplinaNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  disciplina = new Disciplina();
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(
    private disciplinaService: DisciplinaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  findById(id: string) {
    this.disciplinaService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.disciplina = responseApi.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['error'][0]
      });
    });
  }

  register() {
    this.message = {};
    this.disciplinaService.createOrUpdate(this.disciplina).subscribe((responseApi: ResponseApi) => {
      this.disciplina = new Disciplina();
      let disciplina: Disciplina = responseApi.data;
      this.form.resetForm();
      this.router.navigate(['/disciplina-list']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
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

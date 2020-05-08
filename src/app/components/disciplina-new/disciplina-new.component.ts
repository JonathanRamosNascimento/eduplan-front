import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplinaService } from './../../services/disciplina/disciplina.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disciplina-new',
  templateUrl: './disciplina-new.component.html',
  styleUrls: ['./disciplina-new.component.css']
})
export class DisciplinaNewComponent implements OnInit {

  disciplinaForm: FormGroup = this.fb.group({
    'id': [null],
    'nome': ['', [Validators.required]],
    'chteorica': [null, [Validators.required]],
    'chpratica': [null, [Validators.required]],
    'chtotal': [null, [Validators.required]],
    'ementa': ['', [Validators.required]],
    'objetivoGeral': ['', [Validators.required]],
    'objetivoEspecifico': ['', [Validators.required]],
    'habilidadeCompetencias': ['', [Validators.required]],
    'conteudoProgramatico': ['', [Validators.required]],
    'procedimentosDidaticos': ['', [Validators.required]],
    'atividadeIntegrativa': ['', [Validators.required]],
    'primeiraVA': ['', [Validators.required]],
    'segundaVA': ['', [Validators.required]],
    'terceiraVA': ['', [Validators.required]],
    'bibliografiaBasica': ['', [Validators.required]],
    'bibliografiaComplementar': ['', [Validators.required]],
  });
  message: {};
  classCss: {};

  constructor(
    private disciplinaService: DisciplinaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  findById(id: string) {
    this.disciplinaService.findById(id).subscribe((responseApi: ResponseApi) => {
      let data = responseApi.data;
      this.disciplinaForm.setValue(data);
      console.log(data);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['error'][0]
      });
    });
  }

  register() {
    this.message = {};
    this.disciplinaService.createOrUpdate(this.disciplinaForm.value).subscribe((responseApi: ResponseApi) => {
      this.disciplinaForm.reset();
      this.router.navigate(['/disciplina-list']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  verificaValidTouched(campo) {
    return !this.disciplinaForm.get(campo).valid && this.disciplinaForm.get(campo).touched
  }

  verificaEmailInvalido() {
    let campoEmail = this.disciplinaForm.get('email');
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
    };
    this.classCss['alert-' + type] = true;
  }
}

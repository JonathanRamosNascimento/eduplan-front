import { ResponseApi } from './../../model/response-api';
import { DisciplinaService } from './../../services/disciplina/disciplina.service';
import { PlanoDeEnsinoService } from './../../services/plano-de-ensino/plano-de-ensino.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './plano-de-ensino-new.component.html',
  styleUrls: ['./plano-de-ensino-new.component.css']
})
export class PlanoDeEnsinoNewComponent implements OnInit {

  planoForm: FormGroup = this.fb.group({
    'id': [null],
    'disciplina': ['', [Validators.required]],
    'chtotal': [''],
    'chteorica': [''],
    'chpratica': [''],
    'ementa': [''],
    'objetivoGeral': [''],
    'objetivoEspecifico': [''],
    'habilidadeCompetencias': [''],
    'conteudoProgramatico': [''],
    'procedimentosDidaticos': [''],
    'atividadeIntegrativa': [''],
    'primeiraVA': [''],
    'segundaVA': [''],
    'terceiraVA': [''],
    'bibliografiaBasica': [''],
    'bibliografiaComplementar': [''],
    'turno': ['', [Validators.required]],
    'periodo': ['', [Validators.required]],
    'ano': ['', [Validators.required, Validators.minLength(4)]],
    'semestre': ['', [Validators.required]],
  });

  message: {};
  classCss: {};
  listDisciplina = [];

  constructor(
    private planoDeEnsinoService: PlanoDeEnsinoService,
    private route: ActivatedRoute,
    private router: Router,
    private disciplinaService: DisciplinaService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
    this.findAllDisciplinas();
  }

  findById(id: string) {
    this.planoDeEnsinoService.findById(id).subscribe((responseApi: ResponseApi) => {
      let planoDeEnsino = responseApi.data;
      delete planoDeEnsino['user'];
      delete planoDeEnsino['data'];
      this.planoForm.setValue(planoDeEnsino);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  register() {
    this.message = {};
    this.planoDeEnsinoService.createOrUpdate(this.planoForm.value).subscribe((responseApi: ResponseApi) => {
      this.planoForm.reset();
      this.router.navigate(['/plano-de-ensino-list']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  verificaValidTouched(campo) {
    return !this.planoForm.get(campo).valid && this.planoForm.get(campo).touched
  }

  verificaEmailInvalido() {
    let campoEmail = this.planoForm.get('email');
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

  findAllDisciplinas() {
    this.disciplinaService.findAll(0, 10).subscribe((responseApi: ResponseApi) => {
      this.listDisciplina = responseApi['data']['content'];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  changeField() {
    let nomeDaDisciplina = this.planoForm.value.disciplina;

    let filtroDisciplina = this.listDisciplina.filter(function (disciplina) {
      return disciplina.nome == nomeDaDisciplina;
    });
    let formulario = { ...filtroDisciplina[0], disciplina: filtroDisciplina[0].nome, turno: '', periodo: '', ano: '', semestre: '' };
    delete formulario['id'];
    delete formulario['nome'];
    this.planoForm.setValue({...formulario, id: null});
  }
}

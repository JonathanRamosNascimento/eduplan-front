import { ResponseApi } from './../../model/response-api';
import { DisciplinaService } from './../../services/disciplina/disciplina.service';
import { PlanoDeEnsinoService } from './../../services/plano-de-ensino/plano-de-ensino.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanoDeEnsino } from '../../model/plano-de-ensino';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './plano-de-ensino-new.component.html',
  styleUrls: ['./plano-de-ensino-new.component.css']
})
export class PlanoDeEnsinoNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  planoDeEnsino = new PlanoDeEnsino();
  shared: SharedService;
  message: {};
  classCss: {};
  listDisciplina = [];

  constructor(
    private planoDeEnsinoService: PlanoDeEnsinoService,
    private route: ActivatedRoute,
    private router: Router,
    private disciplinaService: DisciplinaService
  ) {
    this.shared = SharedService.getInstance();
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
      this.planoDeEnsino = responseApi.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  register() {
    this.message = {};
    this.planoDeEnsinoService.createOrUpdate(this.planoDeEnsino).subscribe((responseApi: ResponseApi) => {
      this.planoDeEnsino = new PlanoDeEnsino();
      let plnaoDeEnsino: PlanoDeEnsino = responseApi.data;
      this.form.resetForm();
      this.router.navigate(['/plano-de-ensino-list']);
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

  findAllDisciplinas() {
    this.disciplinaService.findAll(0, 10).subscribe((responseApi: ResponseApi) => {
      this.listDisciplina = responseApi['data']['content'];
      console.log(this.listDisciplina);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  changeField() {
    let nomeDaDisciplina = this.form.value.disciplina;
    let filtroDisciplina = this.listDisciplina.filter(function (disciplina) {
      return disciplina.nome == nomeDaDisciplina;
    });
    this.planoDeEnsino.chtotal = filtroDisciplina[0].chtotal;
    this.planoDeEnsino.chteorica = filtroDisciplina[0].chteorica;
    this.planoDeEnsino.chpratica = filtroDisciplina[0].chpratica;
    this.planoDeEnsino.ementa = filtroDisciplina[0].ementa;
    this.planoDeEnsino.objetivoGeral = filtroDisciplina[0].objetivoGeral;
    this.planoDeEnsino.objetivoEspecifico = filtroDisciplina[0].objetivoEspecifico;
    this.planoDeEnsino.habilidadeCompetencias = filtroDisciplina[0].habilidadeCompetencias;
    this.planoDeEnsino.conteudoProgramatico = filtroDisciplina[0].conteudoProgramatico;
    this.planoDeEnsino.procedimentosDidaticos = filtroDisciplina[0].procedimentosDidaticos;
    this.planoDeEnsino.atividadeIntegrativa = filtroDisciplina[0].atividadeIntegrativa;
    this.planoDeEnsino.primeiraVA = filtroDisciplina[0].primeiraVA;
    this.planoDeEnsino.segundaVA = filtroDisciplina[0].segundaVA;
    this.planoDeEnsino.terceiraVA = filtroDisciplina[0].terceiraVA;
    this.planoDeEnsino.bibliografiaBasica = filtroDisciplina[0].bibliografiaBasica;
    this.planoDeEnsino.bibliografiaComplementar = filtroDisciplina[0].bibliografiaComplementar;
  }
}
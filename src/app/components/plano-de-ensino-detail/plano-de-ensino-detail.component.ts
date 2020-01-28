import { PlanoDeEnsinoService } from './../../services/plano-de-ensino/plano-de-ensino.service';
import { ResponseApi } from '../../model/response-api';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlanoDeEnsino } from '../../model/plano-de-ensino';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './plano-de-ensino-detail.component.html',
  styleUrls: ['./plano-de-ensino-detail.component.css']
})
export class PlanoDeEnsinoDetailComponent implements OnInit {

  @ViewChild('content', { static: true }) content: ElementRef;

  @ViewChild("form", { static: true })
  form: NgForm;

  planoDeEnsino = new PlanoDeEnsino();
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(
    private planoDeEnsinoService: PlanoDeEnsinoService,
    private route: ActivatedRoute
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  // Modelo que possa ser usado para gerar o pdf do plano utilizando o pdfMake
  gerarPdf() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var dd = {
      content: [
        {
          text: 'UniEVANGÉLICA',
          style: 'header',
          alignment: 'center'
        },
        {
          text: 'Plano de Ensino',
          alignment: 'center'
        },
        ' ',
        {
          text: 'CURSO DE ENGENHARIA DE COMPUTAÇÃO',
          style: 'nomeCurso',
          alignment: 'center'
        },
        ' ',
        {
          text: '1. CARACTERIZAÇÃO DA DISCIPLINA',
          style: 'subTitulo'
        },
        {
          text: [
            { text: 'Disciplina: ', bold: true }
            , this.planoDeEnsino.disciplina
          ],
          style: 'corpo'
        },
        {
          text: [
            { text: 'Carga Horaria Teórica: ', bold: true },
            this.planoDeEnsino.chteorica + 'h/a'
          ],
          style: 'corpo'
        },
        {
          text: [
            { text: 'Carga Horaria Pratica: ', bold: true },
            this.planoDeEnsino.chpratica + 'h/a'
          ],
          style: 'corpo'
        },
        {
          text: [
            { text: 'Carga Horaria Total: ', bold: true },
            this.planoDeEnsino.chtotal + 'h/a'
          ],
          style: 'corpo'
        },
        ' ',
        {
          text: '2. PROFESSOR(ES)',
          style: 'subTitulo'
        },
        {
          text: [
            { text: 'Docente: ', bold: true },
            this.planoDeEnsino.user.nome
          ],
          style: 'corpo'
        },
        ' ',
        {
          text: '3. EMENTA',
          style: 'subTitulo'
        },
        {
          text: this.planoDeEnsino.ementa,
          style: 'corpo'
        },
        ' ',
        {
          text: '4. OBJETIVOS GERAIS',
          style: 'subTitulo'
        },
        {
          text: this.planoDeEnsino.objetivoGeral,
          style: 'corpo'
        }
      ],

      footer: [
        { text: 'Centro Universitário de Anápolis - UniEVANGÉLICA', alignment: 'center', bold: true, fontSize: 11 },
        { text: 'Avenida Universitária, km. 3,5 - Cidade Universitária - Anápolis - GO - CEP: 75.083-515 - Fone:(62)3310 6600 - www.unievangelica.edu.br', alignment: 'center', fontSize: 9 },
        { text: '"...grandes coisas fez o Senhor por nós, por isso estamos alegres." SI 126,3', alignment: 'center', fontSize: 8 },
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        nomeCurso: {
          fontSize: 25,
          bold: true
        },
        subTitulo: {
          bold: true
        },
        corpo: {
          fontSize: 10,
          alignment: 'justify'
        }
      }
    };
    pdfMake.createPdf(dd).download();
  }

  findById(id: string) {
    this.planoDeEnsinoService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.planoDeEnsino = responseApi.data;
      this.planoDeEnsino.data = new Date(this.planoDeEnsino.data).toISOString();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  // register() {
  //   this.message = {};
  //   this.planoDeEnsinoService.createOrUpdate(this.planoDeEnsino).subscribe((responseApi: ResponseApi) => {
  //     this.planoDeEnsino = new PlanoDeEnsino();
  //     let ticket: PlanoDeEnsino = responseApi.data;
  //     this.form.resetForm();
  //     this.showMessage({
  //       type: 'success',
  //       text: `Registered ${ticket.disciplina} successfully`
  //     });
  //   }, err => {
  //     this.showMessage({
  //       type: 'error',
  //       text: err['error']['errors'][0]
  //     });
  //   });
  // }

  // getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
  //   return {
  //     'form-group': true,
  //     'has-error': isInvalid && isDirty,
  //     'has-success': !isInvalid && isDirty
  //   };
  // }

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
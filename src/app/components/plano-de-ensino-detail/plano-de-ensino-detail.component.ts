import { element } from 'protractor';
import { PlanoDeEnsinoService } from './../../services/plano-de-ensino/plano-de-ensino.service';
import { ResponseApi } from '../../model/response-api';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlanoDeEnsino } from '../../model/plano-de-ensino';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './plano-de-ensino-detail.component.html',
  styleUrls: ['./plano-de-ensino-detail.component.css']
})
export class PlanoDeEnsinoDetailComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  @ViewChild("form")
  form: NgForm;

  planoDeEnsino = new PlanoDeEnsino();
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(
    private planoDeEnsinoService: PlanoDeEnsinoService,
    private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  // Modelo que possa ser usado para gerar o pdf do plano utilizando o jspdf
  imprimir() {
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('teste.pdf');
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

  register() {
    this.message = {};
    this.planoDeEnsinoService.createOrUpdate(this.planoDeEnsino).subscribe((responseApi: ResponseApi) => {
      this.planoDeEnsino = new PlanoDeEnsino();
      let ticket: PlanoDeEnsino = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${ticket.disciplina} successfully`
      });
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
import { PlanoDeEnsinoService } from './../../services/plano-de-ensino/plano-de-ensino.service';
import { ResponseApi } from '../../model/response-api';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../dialog.service';
import { PlanoDeEnsino } from '../../model/plano-de-ensino';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './plano-de-ensino-list.component.html',
  styleUrls: ['./plano-de-ensino-list.component.css']
})
export class PlanoDeEnsinoListComponent implements OnInit {

  assignedToMe: boolean = false;
  page: number = 0;
  count: number = 12;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listPlanoDeEnsino = [];
  planoDeEnsinoFilter = new PlanoDeEnsino();

  constructor(
    private dialogService: DialogService,
    private planoDeEnsinoService: PlanoDeEnsinoService,
    private router: Router) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.planoDeEnsinoService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listPlanoDeEnsino = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  cleanFilter(): void {
    this.assignedToMe = false;
    this.page = 0;
    this.count = 5;
    this.planoDeEnsinoFilter = new PlanoDeEnsino();
    this.findAll(this.page, this.count);
  }


  edit(id: string) {
    this.router.navigate(['/plano-de-ensino-new', id]);
  }

  detail(id: string) {
    this.router.navigate(['/plano-de-ensino-detail', id]);
  }

  delete(id: string, disciplina: string) {
    this.dialogService.confirm('Deseja apagar o plano de ensino da disciplina ' + disciplina + '?')
      .then((candelete: boolean) => {
        if (candelete) {
          this.message = {};
          this.planoDeEnsinoService.delete(id).subscribe((responseApi: ResponseApi) => {
            this.showMessage({
              type: 'success',
              text: `Plano de Ensino excluído com sucesso`
            });
            this.findAll(this.page, this.count);
          }, err => {
            this.showMessage({
              type: 'error',
              text: err['error']['errors'][0]
            });
          });
        }
      });
  }

  setNextPage(event: any) {
    event.preventDefault();
    if (this.page + 1 < this.pages.length) {
      this.page = this.page + 1;
      this.findAll(this.page, this.count);
    }
  }

  setPreviousPage(event: any) {
    event.preventDefault();
    if (this.page > 0) {
      this.page = this.page - 1;
      this.findAll(this.page, this.count);
    }
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.findAll(this.page, this.count);
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

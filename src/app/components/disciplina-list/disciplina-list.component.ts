import { ResponseApi } from './../../model/response-api';
import { Router } from '@angular/router';
import { DisciplinaService } from './../../services/disciplina/disciplina.service';
import { DialogService } from './../../dialog.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disciplina-list',
  templateUrl: './disciplina-list.component.html',
  styleUrls: ['./disciplina-list.component.css']
})
export class DisciplinaListComponent implements OnInit {

  page: number = 0;
  count: number = 12;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listDisciplina = [];

  constructor(
    private dialogService: DialogService,
    private disciplinaService: DisciplinaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.disciplinaService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listDisciplina = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  edit(id: string) {
    this.router.navigate(['/disciplina-new', id]);
  }

  detail(id: string) {
    this.router.navigate(['disciplina-detail', id]);
  }

  delete(id: string, nome: string) {
    this.dialogService.confirm('Deseja apagar a disciplina ' + nome + '?')
      .then((candelete: boolean) => {
        if (candelete) {
          this.message = {};
          this.disciplinaService.delete(id).subscribe((responseApi: ResponseApi) => {
            this.showMessage({
              type: 'success',
              text: 'Disciplina excluída com sucesso!'
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

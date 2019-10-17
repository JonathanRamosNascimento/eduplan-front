import { EDUPLAN_API } from './../eduplan.api';
import { Disciplina } from './../../model/disciplina';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DisciplinaService {

  constructor(private http: HttpClient) {}

  createOrUpdate(disciplina: Disciplina){
    if(disciplina.id != null && disciplina.id != '') {
      return this.http.put(`${EDUPLAN_API}/api/disciplina`, disciplina);
    } else {
      disciplina.id = null;
      return this.http.post(`${EDUPLAN_API}/api/disciplina`, disciplina);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${EDUPLAN_API}/api/disciplina/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${EDUPLAN_API}/api/disciplinas/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${EDUPLAN_API}/api/disciplina/${id}`);
  }
}

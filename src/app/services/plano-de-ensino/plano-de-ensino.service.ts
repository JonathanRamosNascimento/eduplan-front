import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { EDUPLAN_API } from '../eduplan.api';
import { PlanoDeEnsino } from '../../model/plano-de-ensino';

@Injectable()
export class PlanoDeEnsinoService {

  constructor(private http: HttpClient) {}

  createOrUpdate(planoDeEnsino: PlanoDeEnsino){
    if(planoDeEnsino.id != null && planoDeEnsino.id != ''){
      return this.http.put(`${EDUPLAN_API}/api/plano-de-ensino`,planoDeEnsino);
    } else {
      planoDeEnsino.id = null;
      return this.http.post(`${EDUPLAN_API}/api/plano-de-ensino`, planoDeEnsino);
    }
  }

  findAll(page:number,count:number){
    return this.http.get(`${EDUPLAN_API}/api/plano-de-ensino/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${EDUPLAN_API}/api/plano-de-ensino/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${EDUPLAN_API}/api/plano-de-ensino/${id}`);
  }

  findByParams(page:number,count:number,t:PlanoDeEnsino){
    t.numero = t.numero == null ? 0 : t.numero;
    t.disciplina = t.disciplina == '' ? "uninformed" : t.disciplina;
    return this.http.get(`${EDUPLAN_API}/api/plano-de-ensino/${page}/${count}/${t.numero}/${t.disciplina}`);
  }
}
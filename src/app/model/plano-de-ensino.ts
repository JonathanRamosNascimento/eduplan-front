import { User } from './user';

export class PlanoDeEnsino {
    public id: string;
    public user: User;
    public assignedUser: User;
    public data: string;
    public disciplina: string;
    public turno: string;
    public periodo: string;
    public ano: string;
    public semestre: string;
    public chtotal: string;
    public chteorica: string;
    public chpratica: string;
    public creditos: string;
    public ementa: string;
    public objetivoGeral: string;
    public objetivoEspecifico: string;
    public habilidadeCompetencias: string;
    public conteudoProgramatico: string;
    public procedimentosDidaticos: string;
    public atividadeIntegrativa: string;
    public primeiraVA: string;
    public segundaVA: string;
    public terceiraVA: string;
    public bibliografiaBasica: string;
    public bibliografiaComplementar: string;
}

import { User } from './user';

export class PlanoDeEnsino {
    public id: string;
    public numero: number;
    public user: User;
    public assignedUser: User;
    public data: string;
    public disciplina: string;
    public turno: string;
    public chteorica: string;
    public chpratica: string;
    public chtotal: string;
    public creditos: string;
    public periodo: string;
    public ano: string;
    public semestre: string;
    public ementa: string;
    public justificativa: string;
    public objetivos: string;
    public competenciaPreTextual: string;
    public competenciaPessoal: string;
    public competenciaInterpessoal: string;
    public competenciaTecnica: string;
    public competenciaPosTextual: string;
    public interPreTextual: string;
    public interdisciplinaridade: string;
    public unidadeDidatica: string;
    public cronogramaAulas: string;
    public desenvolvimento: string;
    public avaliacaoPreTextual: string;
    public primeiraVa: string;
    public segundaVa: string;
    public terceiraVa: string;
    public observacoes: string;
    public biblioBasica: string;
    public biblioComplementar: string;

    public equals(obj: PlanoDeEnsino): boolean {
        return this.numero === obj.numero;
    }
}

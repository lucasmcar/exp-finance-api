export interface Receita {
    idReceita?: number;
    valor: number;
    descricao: string;
    data_receita: Date;
    idcategoria: number;
    idusuario: number;
}
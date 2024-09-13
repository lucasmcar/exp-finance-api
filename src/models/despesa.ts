export interface Despesa {
    iddespesa?: number;
    valor: number;
    descricao: string;
    data_despesa: Date;
    idcategoria: number;
    idusuario: number;
}
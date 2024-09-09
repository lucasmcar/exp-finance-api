export interface Despesa {
    iddespesa?: number;
    valor: number;
    descricao: string;
    dataEntrada: Date;
    idcategoria: number;
    idusuario: number;
}
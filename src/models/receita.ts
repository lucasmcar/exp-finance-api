export interface Receita {
    idReceita?: number;
    valor: number;
    descricao: string;
    dataEntrada: Date;
    idCategoria: number;
    idUsuario: number;
}
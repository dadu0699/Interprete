import { Tipo } from "./tipo.model";

export class Excepcion {
  public tipo: Tipo;
  public descripcion: string;
  public linea: number;
  public columna: number;

  constructor(tipo: Tipo, descripcion: string,
    linea: number, columna: number) {
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.linea = linea;
    this.columna = columna;
  }

  // public toString = (): string => {
  //   return `${this.tipo} ${this.descripcion} ${this.linea} ${this.columna}`;
  // }
}

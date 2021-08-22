import { Arbol } from './arbol.model';
import { Tabla } from './tabla.model';
import { Tipo } from './tipo.model';

export abstract class Nodo {
  public linea: number;
  public columna: number;
  public tipoObjeto: Tipo;
  public tipo: Tipo;

  constructor(tipoObjeto: Tipo, tipo: Tipo,
    linea: number, columna: number) {
    this.tipoObjeto = tipoObjeto;
    this.tipo = tipo;
    this.linea = linea;
    this.columna = columna;
  }

  public abstract ejecutar(tabla: Tabla, arbol: Arbol): any;
}

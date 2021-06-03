import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class Imprimir extends Nodo {
  public expresiones: Array<Nodo>;

  constructor(tipoOBJ: Tipo, tipo: Tipo, expresiones: Array<Nodo>,
    linea: number, columna: number) {
    super(tipoOBJ, tipo, linea, columna);

    this.tipoOBJ = Tipo.VOID;
    this.tipo = Tipo.VOID;
    this.expresiones = expresiones;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    let consola: string = '';

    this.expresiones.forEach(expresion => {
      consola = `${consola} ${expresion.ejecutar(tabla, arbol)}`;
    });

    arbol.consola.push(`${consola}\n`);
    return null;
  }
}

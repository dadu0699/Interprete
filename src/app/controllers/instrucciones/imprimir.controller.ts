import { Arbol } from 'src/app/models/arbol.model';
import { Excepcion } from 'src/app/models/excepcion.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class Imprimir extends Nodo {
  public expresiones: Array<Nodo>;

  constructor(expresiones: Array<Nodo>,
    linea: number, columna: number) {
    super(Tipo.VOID, Tipo.VOID, linea, columna);

    this.expresiones = expresiones;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    let consola: string = '';

    for (const expresion of this.expresiones) {
      const resultado = expresion.ejecutar(tabla, arbol);

      if (resultado instanceof Excepcion)
        return resultado;

      consola = `${consola} ${expresion.ejecutar(tabla, arbol)}`;
    }

    arbol.consola.push(`${consola}\n`);
    return null;
  }
}

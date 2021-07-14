import { Arbol } from 'src/app/models/arbol.model';
import { Excepcion } from 'src/app/models/excepcion.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class MayorQue extends Nodo {
  public opIzquierdo: Nodo;
  public opDerecho: Nodo;

  constructor(opIzquierdo: Nodo, opDerecho: Nodo,
    linea: number, columna: number) {
    super(Tipo.PRIMITIVO, Tipo.BOOLEAN, linea, columna);

    this.opIzquierdo = opIzquierdo;
    this.opDerecho = opDerecho;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    const resIzquierdo = this.opIzquierdo.ejecutar(tabla, arbol);
    if (resIzquierdo instanceof Excepcion)
      return resIzquierdo;

    const resDerecho = this.opDerecho.ejecutar(tabla, arbol);
    if (resDerecho instanceof Excepcion)
      return resDerecho;

    if ((this.opIzquierdo.tipo == Tipo.DOUBLE || this.opIzquierdo.tipo == Tipo.INTEGER)
      && (this.opDerecho.tipo == Tipo.DOUBLE || this.opDerecho.tipo == Tipo.INTEGER)) {
      return parseFloat(resIzquierdo) >= parseFloat(resDerecho);

    } else {
      const excepcion: Excepcion = new Excepcion('Semántico',
        `Error de tipos en la operación relacional 'mayor que' se está tratando de operar ${this.opIzquierdo.tipo} y ${this.opDerecho.tipo}`,
        this.linea, this.columna);
      arbol.excepciones.push(excepcion);
      arbol.consola.push(excepcion.toString());
      return excepcion;

    }
  }
}

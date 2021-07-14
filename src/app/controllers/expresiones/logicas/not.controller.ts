import { Arbol } from 'src/app/models/arbol.model';
import { Excepcion } from 'src/app/models/excepcion.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class Not extends Nodo {
  public operando: Nodo;

  constructor(operando: Nodo, linea: number, columna: number) {
    super(Tipo.PRIMITIVO, Tipo.BOOLEAN, linea, columna);

    this.operando = operando;
  }

  public ejecutar(tabla: Tabla, arbol: Arbol) {
    const resIzquierdo = this.operando.ejecutar(tabla, arbol);
    if (resIzquierdo instanceof Excepcion)
      return resIzquierdo;

    if (this.operando.tipo == Tipo.BOOLEAN) {
      this.tipo = Tipo.BOOLEAN;
      return !resIzquierdo;

    } else {
      const excepcion: Excepcion = new Excepcion('Semántico',
        `Error de tipos en la operación lógica '!' se está tratando de operar ${this.operando.tipo}`,
        this.linea, this.columna);
      arbol.excepciones.push(excepcion);
      arbol.consola.push(excepcion.toString());
      return excepcion;

    }
  }
}

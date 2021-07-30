import { Arbol } from 'src/app/models/arbol.model';
import { Nodo } from 'src/app/models/nodo.model';
import { Tabla } from 'src/app/models/tabla.model';
import { Tipo } from 'src/app/models/tipo.model';

export class Primitivo extends Nodo {
  public valor: Object;

  constructor(tipoObjeto: Tipo, tipo: Tipo, valor: Object,
    linea: number, columna: number) {
    super(tipoObjeto, tipo, linea, columna);

    this.tipoObjeto = Tipo.PRIMITIVO;
    this.valor = valor;
  }

  public ejecutar(_tabla: Tabla, _arbol: Arbol) {
    return this.valor;
  }
}

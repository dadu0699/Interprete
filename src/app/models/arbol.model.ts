import { NodoGrafico } from "../utils/reports/nodoGrafico";
import { Excepcion } from "./excepcion.model";
import { Nodo } from "./nodo.model";

export class Arbol {
  public instrucciones: Array<Nodo>;
  public excepciones: Array<Excepcion>;
  public consola: Array<string>;
  public grafica: NodoGrafico;

  constructor(instrucciones: Array<Nodo>, grafica: NodoGrafico) {
    this.instrucciones = instrucciones;
    this.grafica = grafica;
    this.excepciones = new Array<Excepcion>();
    this.consola = new Array<string>();
  }

  public getAST(): Object {
    return JSON.parse(JSON.stringify(this.grafica));
  }
}

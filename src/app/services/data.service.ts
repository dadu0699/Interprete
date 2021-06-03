import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Excepcion } from '../models/excepcion.model';
import { Simbolo } from '../models/simbolo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private codigo: BehaviorSubject<string>;
  public currentCodigo: Observable<string>;

  private consola: BehaviorSubject<string>;
  public currentConsola: Observable<string>;

  private simbolos: BehaviorSubject<Array<Array<Simbolo>>>;
  public currentSimbolos: Observable<Array<Array<Simbolo>>>;

  private excepciones: BehaviorSubject<Array<Excepcion>>;
  public currentExcepciones: Observable<Array<Excepcion>>;

  constructor() {
    this.codigo = new BehaviorSubject<string>('');
    this.currentCodigo = this.codigo.asObservable();

    this.consola = new BehaviorSubject<string>('');
    this.currentConsola = this.consola.asObservable();

    this.simbolos = new BehaviorSubject<Array<Array<Simbolo>>>([]);
    this.currentSimbolos = this.simbolos.asObservable();

    this.excepciones = new BehaviorSubject<Array<Excepcion>>([]);
    this.currentExcepciones = this.excepciones.asObservable();
  }

  public changeCodigo(codigo: string): void {
    this.codigo.next(codigo);
  }

  public changeConsola(consola: string): void {
    this.consola.next(consola);
  }

  public changeSimbolos(simbolos: Array<Array<Simbolo>>): void {
    this.simbolos.next(simbolos);
  }

  public changeExcepciones(excepciones: Array<Excepcion>): void {
    this.excepciones.next(excepciones);
  }
}

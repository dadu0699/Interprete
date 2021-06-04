import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Excepcion } from '../models/excepcion.model';
import { Simbolo } from '../models/simbolo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private consola: BehaviorSubject<string>;
  public currentConsola: Observable<string>;

  private ast: BehaviorSubject<Object>;
  public currentAST: Observable<Object>;

  private simbolos: BehaviorSubject<Array<Array<Simbolo>>>;
  public currentSimbolos: Observable<Array<Array<Simbolo>>>;

  private excepciones: BehaviorSubject<Array<Excepcion>>;
  public currentExcepciones: Observable<Array<Excepcion>>;

  constructor() {
    this.consola = new BehaviorSubject<string>('');
    this.currentConsola = this.consola.asObservable();

    this.ast = new BehaviorSubject<Object>({ name: 'RAIZ' });
    this.currentAST = this.ast.asObservable();

    this.simbolos = new BehaviorSubject<Array<Array<Simbolo>>>([]);
    this.currentSimbolos = this.simbolos.asObservable();

    this.excepciones = new BehaviorSubject<Array<Excepcion>>([]);
    this.currentExcepciones = this.excepciones.asObservable();
  }

  public changeConsola(consola: string): void {
    this.consola.next(consola);
  }

  public changeAST(ast: Object): void {
    this.ast.next(ast);
  }

  public changeSimbolos(simbolos: Array<Array<Simbolo>>): void {
    this.simbolos.next(simbolos);
  }

  public changeExcepciones(excepciones: Array<Excepcion>): void {
    this.excepciones.next(excepciones);
  }
}

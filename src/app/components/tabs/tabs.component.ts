import { Component, OnInit } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material/tabs';

import { DataService } from 'src/app/services/data.service'

import { parser as Parser } from 'src/app/utils/gramatica/gramatica.js';

import { Arbol } from 'src/app/models/arbol.model';
import { Tabla } from 'src/app/models/tabla.model';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  public tabs: Array<Object>;
  public contadorTab: number;
  public indexTab: number;

  public options: any;

  private file!: File;

  constructor(private _data: DataService) {
    this.tabs = new Array<Object>();
    this.tabs.push({ id: 0, content: '' });

    this.contadorTab = 0;
    this.indexTab = 0;

    this.options = this.optionsEditor();
  }

  ngOnInit(): void { }

  private optionsEditor(): Object {
    return {
      theme: 'dracula',
      mode: 'application/typescript',
      lineNumbers: true,
      lineWrapping: false,
      foldGutter: true,
      gutters: [
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter',
        'CodeMirror-lint-markers'
      ],
      autoCloseBrackets: true,
      matchBrackets: true,
      lint: true
    };
  }

  public agregarTab(): void {
    this.tabs.push({ id: ++this.contadorTab, content: '' });
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.indexTab = tabChangeEvent.index;
  }

  public cargar(event: any): void {
    this.file = event.target.files[0];
    this.cargarArchivo();
  }

  private cargarArchivo(): void {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result != null) {
        this.tabs[this.indexTab]['content'] = fileReader.result.toString();
      }
    }
    fileReader.readAsText(this.file);
  }

  public guardar() {
    this.guardarArchivo(
      this.tabs[this.indexTab]['content'],
      'text/typescript',
      `new ${this.indexTab}.ts`
    );
  }

  private guardarArchivo(contenido: string, tipo: string, nombre: string): void {
    let a = document.createElement('a');
    let file = new Blob([contenido], { type: tipo });
    a.href = URL.createObjectURL(file);
    a.download = nombre;
    a.click();
  }

  public ejecutar(): void {
    const arbol: Arbol = <Arbol>Parser.parse(
      this.tabs[this.indexTab]['content']
    );
    const tabla: Tabla = new Tabla('Global', undefined);

    arbol.instrucciones.forEach(instruccion => {
      instruccion.ejecutar(tabla, arbol);
    });

    this._data.changeAST(arbol.getAST());
    this.cargarConsola(arbol.consola);
  }

  private cargarConsola(salidas: Array<string>): void {
    let consola = '';

    salidas.forEach(salida => {
      consola += salida;
    });

    this._data.changeConsola(consola);
  }
}

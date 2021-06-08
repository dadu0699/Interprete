import { Component, OnInit } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material/tabs';

import { DataService } from 'src/app/services/data.service'

import { parser } from 'src/app/utils/gramatica/gramatica.js';

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

  public options: Object;

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
      lint: true,
      onLoad: (_editor: any) => {
        this.options['editor'] = _editor;
        setTimeout(() => {
          this.options['editor'].refresh();
        }, 100);
      }
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
      'text/xml',
      `tab${this.indexTab}.xml`
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
    const arbol: Arbol = <Arbol>parser.parse(
      this.tabs[this.indexTab]['content']
    );
    const tabla: Tabla = new Tabla('Global', undefined);

    arbol.instrucciones.forEach(instruccion => {
      console.log(instruccion.ejecutar(tabla, arbol));
    });

    this._data.changeAST(arbol.getAST());
  }
}

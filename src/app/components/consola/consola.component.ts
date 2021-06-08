import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service'

@Component({
  selector: 'app-consola',
  templateUrl: './consola.component.html',
  styles: [
  ]
})
export class ConsolaComponent implements OnInit {
  public options: any;
  public content: string;

  constructor(private _data: DataService) {
    this.options = this.optionsEditor();
    this.content = '';
  }

  private optionsEditor(): Object {
    return {
      theme: 'material-ocean',
      lineNumbers: false,
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
      readOnly: true,
      onLoad: (_editor: any) => {
        this.options['editor'] = _editor;
        setTimeout(() => {
          this.options['editor'].refresh();
        }, 100);
      }
    };
  }

  ngOnInit(): void {
    this._data.currentConsola.subscribe(consola => this.content = consola);
    this.content = 'Hello World!';
  }
}

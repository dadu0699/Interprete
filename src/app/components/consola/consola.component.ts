import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consola',
  templateUrl: './consola.component.html',
  styles: [
  ]
})
export class ConsolaComponent implements OnInit {
  public options: any;
  public content: string;

  constructor() {
    this.options = {
      theme: 'material-ocean',
      lineNumbers: false,
      lineWrapping: false,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      autoCloseBrackets: true,
      matchBrackets: true,
      lint: true,
      readOnly: true
    };

    this.content = 'Hello World!';
  }

  ngOnInit(): void { }
}

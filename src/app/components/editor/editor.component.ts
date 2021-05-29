import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styles: [
  ]
})
export class EditorComponent implements OnInit {
  public options: any;
  public content: string;

  constructor() {
    this.options = {
      theme: 'dracula',
      mode: 'application/typescript',
      lineNumbers: true,
      lineWrapping: false,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      autoCloseBrackets: true,
      matchBrackets: true,
      lint: true,
    };

    this.content = '';
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xml-editor',
  templateUrl: './xml-editor.component.html',
  styles: [
  ]
})
export class XmlEditorComponent implements OnInit {
  public options: any;
  public content: string;

  constructor() {
    this.options = {
      theme: 'dracula',
      mode: 'application/xml',
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

  ngOnInit(): void { }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EditorComponent } from './editor/editor.component';
import { ConsolaComponent } from './consola/consola.component';
import { AstComponent } from './ast/ast.component';
import { ErroresComponent } from './errores/errores.component';
import { SimbolosComponent } from './simbolos/simbolos.component';
import { TabsComponent } from './tabs/tabs.component';
import { XmlEditorComponent } from './xml-editor/xml-editor.component';


@NgModule({
  declarations: [
    EditorComponent,
    ConsolaComponent,
    AstComponent,
    ErroresComponent,
    SimbolosComponent,
    TabsComponent,
    XmlEditorComponent,
  ],
  exports: [
    EditorComponent,
    ConsolaComponent,
    AstComponent,
    ErroresComponent,
    SimbolosComponent,
    TabsComponent,
    XmlEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    CodemirrorModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule
  ]
})
export class ComponentsModule { }

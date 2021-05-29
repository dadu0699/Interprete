import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EditorComponent } from './editor/editor.component';
import { ConsolaComponent } from './consola/consola.component';
import { AstComponent } from './ast/ast.component';
import { ErroresComponent } from './errores/errores.component';
import { SimbolosComponent } from './simbolos/simbolos.component';


@NgModule({
  declarations: [
    EditorComponent,
    ConsolaComponent,
    AstComponent,
    ErroresComponent,
    SimbolosComponent,
  ],
  exports: [
    EditorComponent,
    ConsolaComponent,
    AstComponent,
    ErroresComponent,
    SimbolosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    CodemirrorModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule
  ]
})
export class ComponentsModule { }

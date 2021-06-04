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

import { ConsolaComponent } from './consola/consola.component';
import { AstComponent } from './ast/ast.component';
import { ErroresComponent } from './errores/errores.component';
import { SimbolosComponent } from './simbolos/simbolos.component';
import { TabsComponent } from './tabs/tabs.component';


@NgModule({
  declarations: [
    ConsolaComponent,
    AstComponent,
    ErroresComponent,
    SimbolosComponent,
    TabsComponent,
  ],
  exports: [
    ConsolaComponent,
    AstComponent,
    ErroresComponent,
    SimbolosComponent,
    TabsComponent,
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

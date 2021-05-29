import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-errores',
  templateUrl: './errores.component.html',
  styles: [
  ]
})
export class ErroresComponent implements OnInit, AfterViewInit {
  public pageSize!: number;
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<any>;
  public data: any[];

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private screenHeight!: number;
  private screenWidth!: number;

  constructor() {
    this.onResize();
    this.dataSource = new MatTableDataSource<any>();
    this.displayedColumns = ['id', 'tipo', 'descripcion', 'linea', 'columna'];
    this.data = [
      { id: 1, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
      { id: 2, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
      { id: 3, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
      { id: 4, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
      { id: 5, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
      { id: 6, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
      { id: 7, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
      { id: 8, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
      { id: 9, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
      { id: 10, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
      { id: 11, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
      { id: 12, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
      { id: 13, tipo: 'Lexico', descripcion: 'Token invalido', linea: 1, columna: 1 },
    ];
  }

  async ngOnInit(): Promise<void> {
    this.dataSource.data = this.data;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public handlePage(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(_event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    const size = ((this.screenHeight * 0.95 - 148.5) / 48).toFixed()
    this.pageSize = Number(size);
  }
}

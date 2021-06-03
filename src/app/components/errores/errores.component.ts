import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Excepcion } from 'src/app/models/excepcion.model';

@Component({
  selector: 'app-errores',
  templateUrl: './errores.component.html',
  styles: [
  ]
})
export class ErroresComponent implements OnInit, AfterViewInit {
  public pageSize!: number;
  public displayedColumns: Array<string>;
  public dataSource: MatTableDataSource<any>;
  public data: Array<Excepcion>;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private screenHeight!: number;

  constructor() {
    this.onResize();
    this.dataSource = new MatTableDataSource<any>();
    this.displayedColumns = ['tipo', 'descripcion', 'linea', 'columna'];
    this.data = [];
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

    const size = ((this.screenHeight * 0.95 - 148.5) / 48).toFixed()
    this.pageSize = Number(size);
  }
}

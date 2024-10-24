import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})

export class CategoriesTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id', 'title', 'description'
  ];

  dataSource = new MatTableDataSource([
    {
      id: 'C001',
      title: 'programming',
      description: 'mobile apps and websites'
    },
    {
      id: 'C002',
      title: 'translatin',
      description: 'translating into different languages'
    },
    {
      id: 'C003',
      title: 'law and consulation',
      description: 'formal consulations'
    },
    {
      id: 'C004',
      title: 'visual services',
      description: 'video editing and graphic designs'
    },
    {
      id: 'C005',
      title: 'Audio services',
      description: 'voice over and audio editing'
    }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.pageSize = 5;
  }
}

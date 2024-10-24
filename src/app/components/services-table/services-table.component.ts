import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-table',
  standalone: true,
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ]
})
export class ServicesTableComponent implements AfterViewInit {
  displayedColumns: string[] = ["id", "username", "title", "status", "decision", "details"];

  dataSource = new MatTableDataSource([
    { id: 1, username: 'Tom Collins', title: 'Website Development', status: 'Pending', decision: 'Pending', details: 'Details' },
    { id: 2, username: 'Steve Johnson', title: 'Content Writing', status: 'Accepted', decision: 'Accepted', details: 'Details' },
    { id: 3, username: 'Alice Brown', title: 'Legal Document Translation', status: 'Waiting for Approval', decision: 'Pending', details: 'Details' },
    { id: 4, username: 'Michael Smith', title: 'SEO Optimization', status: 'Accepted', decision: 'Accepted', details: 'Details' },
    { id: 5, username: 'Jessica White', title: 'Logo Design', status: 'Pending', decision: 'Pending', details: 'Details' },
    { id: 6, username: 'David Wilson', title: 'Blog Creation', status: 'Waiting for Approval', decision: 'Pending', details: 'Details' },
    { id: 7, username: 'Laura Taylor', title: 'Marketing Copywriting', status: 'Pending', decision: 'Pending', details: 'Details' },
    { id: 8, username: 'James Davis', title: 'Educational Material Translation', status: 'Accepted', decision: 'Accepted', details: 'Details' },
    { id: 9, username: 'Patricia Martin', title: 'Social Media Management', status: 'Pending', decision: 'Pending', details: 'Details' },
    { id: 10, username: 'Robert Anderson', title: 'Web Application Development', status: 'Waiting for Approval', decision: 'Pending', details: 'Details' },
    { id: 11, username: 'Robert Ande', title: 'Web Application Development', status: 'Waiting for Approval', decision: 'Pending', details: 'Details' }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.pageSize = 5;
    this.paginator.hidePageSize = true;
  }
}

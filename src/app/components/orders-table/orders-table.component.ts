import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss'
})


export class OrdersTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'userID', 'serviceID', 'quantity', 'upgrades', 'status', 'orderNumber', 'totalPrice'
  ];

  dataSource = new MatTableDataSource([
    {
      userID: 'U001',
      serviceID: 'S100',
      quantity: 3,
      upgrades: ['extra web page', 'dark mode'],
      status: 'Awaiting Instructions',
      orderNumber: 'ORD-12345',
      totalPrice: 150
    },
    {
      userID: 'U002',
      serviceID: 'S101',
      quantity: 2,
      upgrades: ['multi-language app', 'hosting'],
      status: 'In Progress',
      orderNumber: 'ORD-12346',
      totalPrice: 200
    },
    {
      userID: 'U003',
      serviceID: 'S102',
      quantity: 1,
      upgrades: ['extra web page'],
      status: 'Awaiting Confirmation',
      orderNumber: 'ORD-12347',
      totalPrice: 100
    },
    {
      userID: 'U004',
      serviceID: 'S103',
      quantity: 5,
      upgrades: ['dark mode', 'hosting'],
      status: 'Delivered',
      orderNumber: 'ORD-12348',
      totalPrice: 350
    },
    {
      userID: 'U005',
      serviceID: 'S104',
      quantity: 4,
      upgrades: ['multi-language app'],
      status: 'Canceled',
      orderNumber: 'ORD-12349',
      totalPrice: 250
    },
    {
      userID: 'U006',
      serviceID: 'S105',
      quantity: 2,
      upgrades: ['extra web page', 'dark mode', 'hosting'],
      status: 'Delivered',
      orderNumber: 'ORD-12350',
      totalPrice: 300
    },
    {
      userID: 'U007',
      serviceID: 'S106',
      quantity: 3,
      upgrades: ['hosting'],
      status: 'Awaiting Instructions',
      orderNumber: 'ORD-12351',
      totalPrice: 150
    },
    {
      userID: 'U008',
      serviceID: 'S107',
      quantity: 1,
      upgrades: ['dark mode', 'multi-language app'],
      status: 'In Progress',
      orderNumber: 'ORD-12352',
      totalPrice: 200
    },
    {
      userID: 'U009',
      serviceID: 'S108',
      quantity: 4,
      upgrades: ['extra web page', 'hosting'],
      status: 'Awaiting Confirmation',
      orderNumber: 'ORD-12353',
      totalPrice: 400
    },
    {
      userID: 'U010',
      serviceID: 'S109',
      quantity: 1,
      upgrades: ['multi-language app'],
      status: 'Delivered',
      orderNumber: 'ORD-12354',
      totalPrice: 100
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

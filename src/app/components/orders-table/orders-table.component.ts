import { Component, AfterViewInit, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IOrder, IOrderData, OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Transaction_id', 'profilePicture', 'username', 'serviceTitle', 'total', 'status', 'updatedAt'];
  ordersData: IOrder[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;
  dataSource = new MatTableDataSource<IOrder>(this.ordersData);

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  private getAllOrders(): void {
    this.loading = true;
    this.ordersService.getAllOrders().subscribe({
      next: (res: IOrderData) => {
        this.ordersData = res.data;  
        this.dataSource.data = this.ordersData;  
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'An error occurred while fetching orders.';
        console.error('Error fetching orders:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

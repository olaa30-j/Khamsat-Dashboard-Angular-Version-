import { Component, AfterViewInit, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router, NavigationEnd } from '@angular/router';
import { IService, ServiceService } from '../../services/service/service.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
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
    MatMenuModule, 
    CommonModule
  ]
})
export class ServicesTableComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'username', 'title', 'status', 'category', 'subcategory', 'details'];
  availableStatuses = ['waiting', 'active', 'paused', 'rejected'];

  servicesData: IService[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;
  dataSource = new MatTableDataSource<IService>(this.servicesData);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private routerSubscription!: Subscription;

  constructor(private servicesLogic: ServiceService, private router: Router) {
    this.getAllServices();
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getAllServices(); // Reload services on navigation end
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe(); // Clean up subscription
    }
  }

  private getAllServices(): void {
    this.loading = true;
    this.servicesLogic.getAllServices().subscribe({
      next: (res: IService[]) => {
        if (res) {
          this.servicesData = res;
          this.dataSource.data = this.servicesData;
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'An error occurred while fetching services.';
        console.error('Error fetching services:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onStatusChange(service: IService, newStatus: string): void {
    if (newStatus !== service.status) {
      this.servicesLogic.updateServiceStatus(service._id, newStatus).subscribe({
        next: () => {
          this.getAllServices();
        },
        error: (error) => {
          console.error("Error updating service status:", error);
        }
      });
    }
  }

  public getAvailableStatuses(currentStatus: string): string[] {
    switch (currentStatus) {
      case 'waiting':
        return ['active', 'rejected'];
      case 'active':
        return ['paused'];
      case 'paused':
        return ['active'];
      case 'rejected':
        return ['active', 'rejected'];
      default:
        return [];
    }
  }

  onDetailsClick(service: IService): void {
    this.router.navigate(['dashboard/services', service._id]);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.pageSize = 5;
    this.paginator.hidePageSize = true;
  }
}

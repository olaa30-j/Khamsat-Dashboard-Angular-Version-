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
import { SocketService } from '../../socket.service';

interface Notification {
  id: string;
  message: string;
  status: 'rejected' | 'accepted' | 'pending';
  serviceLink: string;
  serviceTitle: string;
  timestamp: string;
  read?: boolean;
}

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
  private notificationSubscription: Subscription | null = null;

  constructor(
    private servicesLogic: ServiceService,
    private router: Router,
    private socketService: SocketService
  ) {
    this.getAllServices();
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getAllServices();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
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
          
          // Create notification object
          const notification: Notification = {
            id: crypto.randomUUID(), // Generate unique ID
            message: this.getStatusMessage(newStatus, service.title.en),
            status: this.mapStatus(newStatus),
            serviceLink: `/categories/${service.category.name.en}/${service.subcategory.title.en}/${service._id}`,
                      // `/categories/Programming%20&%20Development/Website%20Development/67257a39865b27266be567bf`
            serviceTitle: service.title.en,
            timestamp: new Date().toISOString(),
          };
          console.log(service)
          // Send notification through socket
          this.socketService.sendNotification(service.userId._id, notification);
          
          console.log('Notification sent:', notification);
        },
        error: (error) => {
          console.error("Error updating service status:", error);
        }
      });
    }
  }

  private getStatusMessage(status: string, serviceTitle: string): string {
    switch (status) {
      case 'active':
        return `تم قبول خدمتك: ${serviceTitle}`;
      case 'rejected':
        return `للأسف، لم يتم قبول الخدمة: ${serviceTitle}. يرجى زيارة صفحة الخدمة للاطلاع على التعديلات المطلوبة لنشرها.`;
      case 'paused':
        return `تم إيقاف خدمتك مؤقتاً: ${serviceTitle}`;
      default:
        return `تم تحديث حالة خدمتك: ${serviceTitle}`;
    }
  }

  private mapStatus(status: string): 'rejected' | 'accepted' | 'pending' {
    switch (status) {
      case 'active':
        return 'accepted';
      case 'rejected':
        return 'rejected';
      case 'paused':
      case 'waiting':
      default:
        return 'pending';
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
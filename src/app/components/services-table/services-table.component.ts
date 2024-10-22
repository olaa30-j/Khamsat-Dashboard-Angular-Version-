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
  displayedColumns: string[] = ["id", "اسم المستخدم", "عنوان الخدمة", "الحالة", "القرار"];

  dataSource = new MatTableDataSource([
    { id: 1, 'اسم المستخدم': 'Tom Collins', 'عنوان الخدمة': 'تطوير موقع إلكتروني', 'الحالة': 'معلق', 'القرار': 'معلق' },
    { id: 2, 'اسم المستخدم': 'Steve Johnson', 'عنوان الخدمة': 'كتابة محتوى للموقع', 'الحالة': 'موافق', 'القرار': 'موافق' },
    { id: 3, 'اسم المستخدم': 'Alice Brown', 'عنوان الخدمة': 'ترجمة مستندات قانونية', 'الحالة': 'في انتظار الموافقة', 'القرار': 'معلق' },
    { id: 4, 'اسم المستخدم': 'Michael Smith', 'عنوان الخدمة': 'تحسين محركات البحث (SEO)', 'الحالة': 'موافق', 'القرار': 'موافق' },
    { id: 5, 'اسم المستخدم': 'Jessica White', 'عنوان الخدمة': 'تصميم شعار جديد', 'الحالة': 'معلق', 'القرار': 'معلق' },
    { id: 6, 'اسم المستخدم': 'David Wilson', 'عنوان الخدمة': 'إنشاء مدونة', 'الحالة': 'في انتظار الموافقة', 'القرار': 'معلق' },
    { id: 7, 'اسم المستخدم': 'Laura Taylor', 'عنوان الخدمة': 'كتابة نصوص تسويقية', 'الحالة': 'معلق', 'القرار': 'معلق' },
    { id: 8, 'اسم المستخدم': 'James Davis', 'عنوان الخدمة': 'ترجمة مواد تعليمية', 'الحالة': 'موافق', 'القرار': 'موافق' },
    { id: 9, 'اسم المستخدم': 'Patricia Martin', 'عنوان الخدمة': 'إدارة وسائل التواصل الاجتماعي', 'الحالة': 'معلق', 'القرار': 'معلق' },
    { id: 10, 'اسم المستخدم': 'Robert Anderson', 'عنوان الخدمة': 'برمجة تطبيقات ويب', 'الحالة': 'في انتظار الموافقة', 'القرار': 'معلق' }
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

  // Handle acceptance
  onAccept(element: any): void {
    console.log('Accepted:', element);
    // Add logic to handle acceptance
  }

  // Handle rejection
  onReject(element: any): void {
    console.log('Rejected:', element);
    // Add logic to handle rejection
  }
}

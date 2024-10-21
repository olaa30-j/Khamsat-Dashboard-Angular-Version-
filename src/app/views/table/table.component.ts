import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; 
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ["id", "اسم المستخدم", "عنوان الخدمة", "الحالة", "القرار"];
  
  // Initialize the data source
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
    this.paginator.pageSize = 5;  
    this.paginator.hidePageSize = true;  
  }
  // we will apply some logic for onAccept and onReject of the service

}

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    MatCardModule,
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
  ],
  providers: [],
  bootstrap: [TableComponent] 
})
export class AppModule { }

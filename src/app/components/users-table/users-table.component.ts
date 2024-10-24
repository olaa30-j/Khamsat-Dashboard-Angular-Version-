import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-table',
  standalone: true,
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ]
})
export class UsersTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    "username", "accountType", "email", "emailVerification", 
    "profilePicture", "gender", "birthdate", "financialInfo"
  ];

  dataSource = new MatTableDataSource([
    {
      username: 'JohnDoe',
      accountType: 'Basic',
      email: 'john@example.com',
      emailVerification: 'Verified',
      profilePicture: '/assets/default_user.png',
      gender: 'Male',
      birthdate: '1990-01-01',
      financialInfo: {
        totalBalance: 1000,
        pendingBalance: 500,
        withdrawableEarnings: 300
      }
    },
    {
      username: 'JohnDoe',
      accountType: 'Basic',
      email: 'john@example.com',
      emailVerification: 'Verified',
      profilePicture: '/assets/default_user.png',
      gender: 'Male',
      birthdate: '1990-01-01',
      financialInfo: {
        totalBalance: 1000,
        pendingBalance: 500,
        withdrawableEarnings: 300
      }
    },
    {
      username: 'JohnDoe',
      accountType: 'Basic',
      email: 'john@example.com',
      emailVerification: 'Verified',
      profilePicture: '/assets/default_user.png',
      gender: 'Male',
      birthdate: '1990-01-01',
      financialInfo: {
        totalBalance: 1000,
        pendingBalance: 500,
        withdrawableEarnings: 300
      }
    },
    {
      username: 'JohnDoe',
      accountType: 'Basic',
      email: 'john@example.com',
      emailVerification: 'Verified',
      profilePicture: '/assets/default_user.png',
      gender: 'Male',
      birthdate: '1990-01-01',
      financialInfo: {
        totalBalance: 1000,
        pendingBalance: 500,
        withdrawableEarnings: 300
      }
    },
    {
      username: 'JohnDoe',
      accountType: 'Basic',
      email: 'john@example.com',
      emailVerification: 'Verified',
      profilePicture: '/assets/default_user.png',
      gender: 'Male',
      birthdate: '1990-01-01',
      financialInfo: {
        totalBalance: 1000,
        pendingBalance: 500,
        withdrawableEarnings: 300
      }
    },
    {
      username: 'JaneDoe',
      accountType: 'Premium',
      email: 'jane@example.com',
      emailVerification: 'Not Verified',
      profilePicture: '/assets/default_user.png',
      gender: 'Female',
      birthdate: '1985-05-15',
      financialInfo: {
        totalBalance: 2000,
        pendingBalance: 800,
        withdrawableEarnings: 1200
      }
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

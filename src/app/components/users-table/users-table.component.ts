import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { IUser, UsersService } from '../../services/users/users.service';

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
export class UsersTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    "profilePicture", "username", "accountType", "email", "emailVerification"
  ];

  usersData: IUser[] = []; 
  loading: boolean = true; 
  errorMessage: string | null = null;
  dataSource = new MatTableDataSource<IUser>(this.usersData); 

  constructor(private usersLogic: UsersService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getAllUsers();
    this.dataSource.paginator = this.paginator;
  }

  private getAllUsers(): void {
    this.loading = true;
    this.usersLogic.getAllUsers().subscribe({
      next: (res: IUser[]) => {
        if(res){
          this.usersData = res
          this.dataSource.data = this.usersData; 
          console.log(this.usersData);
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'An error occurred while fetching Users.'; 
        console.error('Error fetching Users:', error); 
      },
      complete: () => {
        this.loading = false; 
      }
    });
  }

  onStatusChange(userId: string, currentStatus: boolean): void {
    const newStatus = !currentStatus;
    if (newStatus !== currentStatus) {
      this.usersLogic.updateUserStatus(userId, newStatus).subscribe({
        next: () => {
          this.getAllUsers();
        },
        error: (error) => {
          console.error("Error updating service status:", error);
        }
      });
    }
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.pageSize = 5;
  }
}

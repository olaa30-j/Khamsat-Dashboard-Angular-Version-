import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { of } from 'rxjs';

export interface IUser {
  _id:string;
  username?: string;
  account_type?: "seller" | "buyer";
  password: string;
  email: string;
  isEmailVerified: boolean;
  first_name: {
    ar: string;
    en: string;
  };
  last_name: {
    ar: string;
    en: string;
  };
  profilePicture?: string;
  country?: string;
  city?: string;
  gender?: "male" | "female";
  birth_date?: Date;
  phone_number?: string;
  bio?: string;
  financial_info?: {
    total_balance?: number;
    pending_balance?: number;
    withdrawable_earnings?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  users: IUser[] = [];
  private url: string = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}`, { withCredentials: true }).pipe(
      tap((response) => {
        this.users = response;
      }),
      catchError((error) => {
        console.error('Error fetching users:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        return of([]); 
      })
    );
  }

  updateUserStatus(id: string, newStatus: boolean): Observable<IUser> {
    return this.http.patch<IUser>(
      `${this.url}/dashboard/${id}`, 
      { isEmailVerified: newStatus }, 
      { withCredentials: true }
    );
  }
  
}

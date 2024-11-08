import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

interface User {
  first_name: {
    en: string;
    ar: string;
  };
  last_name: {
    en: string;
    ar: string;
  };
  _id: string;
  profilePicture: string;
}

interface Service {
  title: {
    en: string;
    ar: string;
  };
  _id: string;
  userId: User;
}

interface Item {
  service_id: Service;
  quantity: number;
  upgrades: any[];
  _id: string;
}

interface OrderStatus {
  ar: string;
  en: string;
}

export interface IOrder {
  status: OrderStatus;
  _id: string;
  user_id: User;
  items: Item[];
  order_number: number;
  createdAt: string;
  updatedAt: string;
  total: number;
  __v: number;
}

export interface IOrderData {
  data:IOrder[]
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orders: IOrder[] = [];
  private url: string = `${environment.apiUrl}orders`;

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<IOrderData> {  
    return this.http.get<IOrderData>(`${this.url}`, { withCredentials: true }).pipe(
      tap((response) => {
        this.orders = response.data;
      }),
      catchError((error) => {
        console.error('Error fetching Orders:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        return of({ data: [] }); 
      })
    );
  }
}

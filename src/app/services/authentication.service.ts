import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  errorMessage: string | null = null;
  timerInterval: any | null = null;

  userStatus: BehaviorSubject<boolean>
  url: string = `${environment.apiUrl}admin/`

  constructor(private router: Router, private cookieService: CookieService, private http: HttpClient) {
    this.userStatus = new BehaviorSubject<boolean>(this.isAdminLogged)
  }

  login(email: string, password: string): void {
    this.http.post<{ message: string }>(`${this.url}login`, { email, password }, { withCredentials: true }).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome to the dashboard.',
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const popup = Swal.getPopup();
            if (popup) { 
              const timer = popup.querySelector("b");
              if (timer) { 
                this.timerInterval = setInterval(() => {
                  timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
              }
            };
          },
          willClose: () => {
            clearInterval(this.timerInterval);
          }
        }).then(() => {
          this.userStatus.next(true);
          this.router.navigate(['/dashboard']);
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Please check your credentials and try again.',
          confirmButtonText: 'Retry'
        });
        console.error('Login error:', error);
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }


  logout() {
    this.cookieService.delete('authToken', '/');
    this.userStatus.next(false);
    this.router.navigate(['/login']);
  }

  get isAdminLogged(): boolean {
    return this.cookieService.check('authToken');
  }

  getUserStatus() {
    this.userStatus.asObservable();
  }

  getUserData() {
    const token = this.cookieService.get('authToken');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
}

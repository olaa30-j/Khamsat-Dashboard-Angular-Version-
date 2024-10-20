import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  errorMessage: string | null = null;

  userStatus:BehaviorSubject<boolean>
  url: string = `${environment.apiUrl}admin/`

  constructor(private router: Router, private cookieService: CookieService,  private http: HttpClient) {
    this.userStatus = new BehaviorSubject<boolean>(this.isAdminLogged) 
  }

  login(email: string, password: string): void {
    this.http.post<{ message: string }>(`${this.url}login`, { email, password }, { withCredentials: true }).subscribe({
      next: response => {
          this.userStatus.next(true);
          this.router.navigate(['/dashboard']); 
      },
      error: error => {
        this.errorMessage = error.error?.message || 'Login failed. Please check your credentials and try again.';
        console.error('Login error:', error);
      },
      complete: () => {
        console.log( this.cookieService.getAll());
        console.log('Login request completed');
      }
    });
  }

  logout() {
    this.cookieService.delete('authToken', '/'); 
    this.userStatus.next(false); 
    this.router.navigate(['/login']); 
  }

  get isAdminLogged():boolean{
    return this.cookieService.get('authToken')? true : false;
  }
  
  getUserStatus(){
    this.userStatus.asObservable();
  }
}

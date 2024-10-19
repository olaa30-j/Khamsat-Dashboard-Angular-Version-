import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentcationService {
  userStatus:BehaviorSubject<boolean>
  constructor(private router: Router, private cookieService: CookieService) {
    this.userStatus = new BehaviorSubject<boolean>(this.isAdminLogged) 
  }

  // behaviour
  login(email:string, password:string){
        const dummyToken = 'abcd1234';  
        this.cookieService.set('authToken', dummyToken, 1, '/'); 
        this.router.navigate(['/dashboard']); 
        this.userStatus.next(true)
  }

  logout(){
    this.cookieService.delete('authToken', '/');  
    this.router.navigate(['/login']);
    this.userStatus.next(false)
  }

  get isAdminLogged():boolean{
    return this.cookieService.get('authToken')? true : false;
  }
}

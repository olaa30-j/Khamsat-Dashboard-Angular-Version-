import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

export interface JwtPayload {
  role: string;                
  email: string;              
  userName: string;            
  profile_picture_url?: string; 
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})



export class NavbarComponent implements OnInit{
  userData: JwtPayload | null = null
  constructor(private AuthenticationService:AuthenticationService){}

  ngOnInit(): void {
     this.userData = this.AuthenticationService.getUserData() as JwtPayload
     console.log(this.userData);
     
  }
}

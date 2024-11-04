import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { NotificationService } from '../../services/notification/notification-service.service';

export interface JwtPayload {
  role: string;
  email: string;
  userName: string;
  profile_picture_url?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})



export class NavbarComponent implements OnInit {
  userData: JwtPayload | null = null
  constructor(private AuthenticationService: AuthenticationService, public sidebarService: SidebarService, private notificationService:NotificationService) {
   }
  isDropdownVisible: boolean= false;
  notifications: any[] = [];
  isNotificationOpen: boolean = false
  isSidebarOpen: boolean = true;
  currentSidebarTab: string | null = 'linksTab';

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  toggleMessagePanel() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.currentSidebarTab = 'messagesTab';
  }

  ngOnInit(): void {
    this.userData = this.AuthenticationService.getUserData() as JwtPayload
    this.sidebarService.isSidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });

    this.sidebarService.currentSidebarTab$.subscribe( tab => {
      this.currentSidebarTab = tab;
    });

    this.notificationService.getServiceCreatedNotification().subscribe((data) => {
      this.notifications.push(data);
    });
  }


  toggleNotification() {
      this.isNotificationOpen = !this.isNotificationOpen;
  }

  logout(){
    this.AuthenticationService.logout()
  }

  toggleSidebar(tab: string) {
    return this.sidebarService.toggleSidebar(tab)
  }
}

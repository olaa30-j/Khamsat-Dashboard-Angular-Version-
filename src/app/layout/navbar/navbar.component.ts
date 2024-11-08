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
  userData: JwtPayload | null = null;
  constructor(
    private AuthenticationService: AuthenticationService, 
    public sidebarService: SidebarService, 
    private notificationService: NotificationService
  ) {}
  
  isDropdownVisible: boolean = false;
  // Initialize notifications array as empty
  notifications: any[] = [];  
  isNotificationOpen: boolean = false;
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
    this.userData = this.AuthenticationService.getUserData() as JwtPayload;
    
    // Retrieve saved notifications from localStorage when component initializes
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      this.notifications = JSON.parse(savedNotifications);
    }

    // Subscribe to sidebar state changes
    this.sidebarService.isSidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });

    // Subscribe to sidebar tab changes
    this.sidebarService.currentSidebarTab$.subscribe(tab => {
      this.currentSidebarTab = tab;
    });

    // Subscribe to new notifications
    this.notificationService.getServiceCreatedNotification().subscribe((data) => {
      // Add new notification to the array
      this.notifications.push(data);
      // Save updated notifications to localStorage
      this.saveNotificationsToLocalStorage();
    });
  }

  // Helper function to save notifications to localStorage
  private saveNotificationsToLocalStorage() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  // Remove a specific notification by index
  removeNotification(index: number) {
    this.notifications.splice(index, 1);
    this.saveNotificationsToLocalStorage();
  }

  // Clear all notifications
  clearAllNotifications() {
    this.notifications = [];
    this.saveNotificationsToLocalStorage();
  }

  toggleNotification() {
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  logout() {
    this.AuthenticationService.logout();
  }

  toggleSidebar(tab: string) {
    return this.sidebarService.toggleSidebar(tab);
  }
}
// src/app/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

interface Notification {
  id: string;
  message: string;
  status: string;
  serviceLink: string;
  serviceTitle: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl);
    this.socket.emit('register', 'admin');
  }


  sendNotification(userId: string, notification: Notification) {
    this.socket.emit('serviceStatusUpdated', { userId, notification });
  }

  onNotification() {
    return new Observable<{ message: string }>(observer => {
      this.socket.on('notification', (data: { message: string }) => {
        observer.next(data);
      });

      return () => {
        this.socket.off('notification');
      };
    });
  }
}

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;
  private url: string = `${environment.apiUrl}`;

  constructor() {
    this.socket = io(`${this.url}`);
  }

  getServiceCreatedNotification(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('serviceCreated', (data) => {
        console.log("serviceCreated")
        const audio = new Audio('/notification.mp3');
        audio.play();
        observer.next(data);
      });
    });
  }
}

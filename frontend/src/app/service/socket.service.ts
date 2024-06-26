import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class SocketService {


  private socket = io('http://localhost:8001');
  constructor() { }

  sendMessage(data:any) {
    this.socket.emit('message', data);
  }

  receiveReply() {
    const observable = new Observable<any>(observer => {
      this.socket.on('reply', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
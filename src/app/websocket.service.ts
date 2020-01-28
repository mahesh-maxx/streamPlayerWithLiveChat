import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket; 
  constructor() { }
  connect(): Rx.Subject<MessageEvent> {
    this.socket = io('http://localhost:5000/');

    const observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log('Received a message from websocket service');
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    };

    return Rx.Subject.create(observer, observable);
  }
}

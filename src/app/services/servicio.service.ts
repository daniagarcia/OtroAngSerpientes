import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  
  constructor(private http:Http) { }
  ws: WebSocket
  crearObservableSocket(url:string):Observable<string>{
    this.ws = new WebSocket(url)
    return new Observable(observer=>{
      this.ws.onmessage=(event)=> observer.next(event.data)
    })
  }
  Getimg()
  {
    return this.http.get('https://jsonplaceholder.typicode.com/photos')
  }
}

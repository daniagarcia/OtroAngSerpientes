import { Injectable } from '@angular/core';
//import {Http, Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService 
{
  constructor(private http:HttpClient ){}
  
  ngOnInit() {}
  
  Getimg()
  {
    return this.http.get('https://jsonplaceholder.typicode.com/photos')
  }
}
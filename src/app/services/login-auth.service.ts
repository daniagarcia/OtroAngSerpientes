import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  constructor(private http:HttpClient, private router:Router) { }
  
  ngOnInit() {}

  GetUser()
  {
     return this.http.get<any>('https://jsonplaceholder.typicode.com/users');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  ngOnInit(){}


  
  login(username:string,password:string){
    return this.http.post<any>(`${config}/users/authenticate`,{username:username,password:password})
    .pipe(map(user =>{
      if(user && user.token){
        localStorage.setItem('currentUser',JSON.stringify(user));
      }
      return user;
    }));
  }
  logout(){
    localStorage.removeItem('currentUset');
  }
}

  // GetUser(){
  //   return this.http.get<any>('http://127.0.0.1:3333/TraerUsu'); 

  // }

  // SetUser(username:string , password:string):any
  // {
  //     return this.http.post('http://127.0.0.1:3333/insertarUser',{username,password});
  // }

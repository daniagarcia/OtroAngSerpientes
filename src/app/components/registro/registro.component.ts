import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../../services/auth.service'

 
import { sendRequest } from 'selenium-webdriver/http';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  constructor( private router: Router ,private http:HttpClient ) { }

  ngOnInit() {
  }

  RegUsu(event) 
  {
    event.preventDefault()
    const target = event.target
    const usu = target.querySelector('#usu').value
    const email = target.querySelector('#email').value
    const psw = target.querySelector('#psw').value
    console.log(usu, psw)

     this.http.post('http://127.0.0.1:3333/insertarUser',{usu:usu,email:email,psw:psw}).subscribe(res=>{
       console.log(res)
       if(res == true){
        this.router.navigate(['/'])
       }
     });

    //this.sere.SetUser(usu,psw)

    //this.router.navigate(['/'])
  }

}

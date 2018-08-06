import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {

  constructor(private  route: ActivatedRoute,
    private router: Router,private http:HttpClient) { }

    
   
  ngOnInit() {   
  }  

  onSubmit(event){
    event.preventDefault()
    const target = event.target
    const usu = target.querySelector('#usu').value
    const psw = target.querySelector('#psw').value
    console.log(usu, psw)
    // localStorage.getItem('id_user')
     this.http.post<any>('http://127.0.0.1:3333/login',{usu:usu,psw:psw}).subscribe(res=>{
       console.log(res)
       localStorage.setItem('token',res.sesion.token);
       localStorage.setItem('usuario',res.user.username);
       localStorage.setItem('id_user',res.user.id);

       this.router.navigate(['tb']);
     });
  }





}

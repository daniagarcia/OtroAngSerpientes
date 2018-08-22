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

    modaal:boolean= false;
    
   
  ngOnInit() {   
  }  

  onSubmit(event){
    event.preventDefault()
    const target = event.target
    const usu = target.querySelector('#usu').value
    const psw = target.querySelector('#psw').value
    console.log(usu, psw)
    // localStorage.getItem('id_user')
     this.http.post<any>('http://127.0.0.1:3333/',{usu:usu,psw:psw}).subscribe(res=>{
      console.log(res.sesion)  
     if(!res.sesion.type ){
         this.modaal=true;
         console.log('entre  1')
      }else {
        console.log('res.sesion')
          localStorage.setItem('token',res.sesion.token);
          localStorage.setItem('usuario',res.usuario.username);
          localStorage.setItem('id_user',res.usuario.id);
          this.router.navigate(['usuarios']);
        }
    
     });
  }





}

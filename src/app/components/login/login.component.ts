import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from '../../Services/auth.service';
import { LoginAuthService } from '../../services/login-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pass: string = "asd"
  asd: any = this.Aunt.GetUser();
  asd1: any;
  usus: any;
  bool: boolean

  constructor(
    private Aunt: LoginAuthService, private router: Router) { }//private autha:AuthService

  ngOnInit() {
    this.bool = false
    this.GetUsu();
    //console.log(this.usus);
  }

  GetUsu() {
    this.Aunt.GetUser().subscribe(res => {
      //console.log(res);
      this.usus = res;
    })
  }

  loginUser(event) {
    event.preventDefault()
    const target = event.target
    const usu = target.querySelector('#usu').value
    const psw = target.querySelector('#psw').value
    console.log(usu, psw)
    //console.log(this.asd)

    if (usu != "" && psw != "") {
      for (let i = 0; i < this.usus.length; i++) {
        if (usu === this.usus[i].username && psw === this.pass) {
          localStorage.setItem('user', this.usus[i].id)
          this.bool = true
          this.setBool()
        }
        if (localStorage.getItem('user') == null) {
          alert('nel')
          this.bool = false
          this.setBool()
        }
        else {
          this.router.navigate(['/inicio'])
        }
      }
    }
    else {
      alert("error vacio")
    }
  }
  setBool() {
    return this.bool
  }


}

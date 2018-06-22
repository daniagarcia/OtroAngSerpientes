import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit 
{
  public Susu: string
  public Spsw: string

  constructor(    private router: Router    ) { }

  ngOnInit() { }

  RegUsu(event) 
  {
    event.preventDefault()
    const target = event.target
    const usu = target.querySelector('#usu').value
    const psw = target.querySelector('#psw').value
    console.log(usu, psw)
  //  console.log(this.asd)
    //this.Aunt.VerLogin(usu,psw)

  }

}


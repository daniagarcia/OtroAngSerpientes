import { Component, OnInit } from '@angular/core';
import { Celda } from '../../Clases/Celda'
import { User } from '../../Clases/User';
// import { setInterval } from 'timers';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  constructor() { }

  celdas: Celda[][] = [];
  contador: number = 0;

  jugador1:User;  
  jugador2:User;

  relaciones: Object = {
    //Escaleras.
    3:51,
    6:27,
    20:70,
    36:55,
    63:95,
    68:98,
    //Serpientes.
    99:69,
    91:61,
    87:57,
    65:52,
    47:19,
    34:1,
    25:5
  }

  ngOnInit() {
    this.jugador1 = new User();
    this.jugador2 = new User();
 
    for (let i = 0; i < 10; i++) {
      if (!this.celdas[i]) {
        this.celdas[i] = [];
      }

      for (let y = 0; y < 10; y++) {
        this.contador++;
        var celda = new Celda()
        if (this.contador == 1) {
          this.jugador1.posicion=this.contador;
          this.jugador2.posicion= this.contador;
        }
        celda.numero = this.contador;

        this.celdas[i].push(celda);
      }
    }
    console.log(this.celdas)
  }

 // public number: number = 1;
  public a
  public n: number = 1
  public m: number = 0;
  public dices = ["", "&#9856", "&#9857", "&#9858", "&#9859", "&#9860", "&#9861"];
  public nuns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  public id: number = 100;
  public r: number = 0;

  public marginleft: number = 0;
  public num: number = 1;

  dado: number = 1
  clickrandom() {
    this.dado = Math.ceil(Math.random() * 6);
    this.moverJugador()
  }
  
  moverJugador(){
    this.animador = 0
    this.moverAnimado()
  }

  animador: number = 0;
  animDuration: number = 100
  moverAnimado(){
    this.jugador1.posicion++

    this.animador++

    if(this.animador < this.dado){
      setTimeout(() => {
        this.moverAnimado()
      }, this.animDuration);
    }
    else{
      setTimeout(() => {
        if(this.relaciones.hasOwnProperty(this.jugador1.posicion)){
          this.jugador1.posicion = this.relaciones[this.jugador1.posicion]
        }
      }, this.animDuration);
    }
  }
 
}

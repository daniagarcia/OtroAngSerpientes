import { Component, OnInit } from '@angular/core';
import { Celda } from '../../Clases/Celda'
import { User } from '../../Clases/User';
import Ws from '@adonisjs/websocket-client';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  ws = Ws('ws://localhost:3333');
  usuario:any = {
    id :"",
    nombre:""
  }
  listUsuarios: Array<any>=[]
  partida : any = {
    turno:"",
    retador:"",
    tirar:false,
    ficha1:"",
    ficha2:"",
    partida:"pendiente",
    dado:0

  }

  constructor(private  route: ActivatedRoute,
    private router: Router,private http:HttpClient) { }

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
    //Serpientes
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
    this.ObtenerUser()
    this.obtenerValoresPartida()
    this.iniciarConexion()
    this.cargarArreglo()
    
    
 
    // for (let i = 0; i < 10; i++) {
    //   if (!this.celdas[i]) {
    //     this.celdas[i] = [];
    //   }

    //   for (let y = 0; y < 10; y++) {
    //     this.contador++;
    //     var celda = new Celda()
    //     if (this.contador == 1) {
    //       this.jugador1.posicion=this.contador;
    //       this.jugador2.posicion= this.contador;
    //     }
    //     celda.numero = this.contador;

    //     this.celdas[i].push(celda);
    //   }
    // }
    // console.log(this.celdas)
  }

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
    if((this.partida.partida == "empezar" || this.partida.partida == "comenzar") && this.partida.tirar == true){
    this.dado = Math.ceil(Math.random() * 6);
    this.partida.dado= this.dado
    this.partida.tirar = false
    this.partida.partida = "comenzar"
    if(this.partida.turno == "1"){
      this.moverJugador(this.partida.ficha1)
    }else{
      this.moverJugador(this.partida.ficha2)
    }
    console.log(this.partida)
    this.ws.getSubscription('juego').emit('partida',this.partida)

 
    }
  }
  
  moverJugador(jugador: User){
    this.animador = 0
    this.moverAnimado(jugador)
  }

  animador: number = 0;
  animDuration: number = 100
  moverAnimado(jugador: User){
   jugador.posicion++

    this.animador++

    if(this.animador < this.dado){
      setTimeout(() => {
        this.moverAnimado(jugador)
      }, this.animDuration);
    }
    else{
      setTimeout(() => {
        if(this.relaciones.hasOwnProperty(jugador.posicion)){
          jugador.posicion = this.relaciones[jugador.posicion]
        }
      }, this.animDuration);
    }
  }
  ObtenerUser(){
    this.usuario.id= localStorage.getItem('id_user');
    this.usuario.nombre= localStorage.getItem('usuario');

  }

  iniciarConexion(){
    this.ws = new Ws('ws:/localhost:3333').connect();
    this.ws.on('open',data => {
      console.log('se conecto!c:');
      this.subscribirCanal();
        this.ws.getSubscription('juego').emit('partida',this.partida)
    })
    this.ws.on('error',data => {
      console.log('Error de conexión :c')
    })
    
  }
//data es el objeto con la info del usuario
  subscribirCanal(){
    let canal  = this.ws.subscribe('juego')
    console.log('SUBSCRITO AL CANAL JUEGO ')

    canal.on('error',data => {
      console.log('error al suscribir canal')
    })

    canal.on('partida',data => {
      console.log(data)
      if(data.retador == this.usuario.nombre){
        if(data.partida == "pendiente"){
          this.partida.partida = "empezar"
          this.ws.getSubscription('juego').emit('partida',this.partida)
        }
      }else if(data.partida == "comenzar"){
        console.log(data)
        if(data.turno == "1"){
          this.dado = data.dado
          this.partida.dado = data.dado
          this.partida.ficha1 = data.ficha1
          this.partida.tirar = true
          this.moverJugador(this.partida.ficha1) 
        }else{
          this.dado = data.dado
          this.partida.dado = data.dado
          this.partida.ficha2 = data.ficha2
          this.partida.tirar = true
          this.moverJugador(this.partida.ficha2)
        }
      }
      
    });
    
  }

  obtenerValoresPartida(){
    this.partida.turno = localStorage.getItem('turno')    
    this.partida.retador = localStorage.getItem('retador')
    if(this.partida.turno == 1){
      this.partida.tirar= true 
    }
    this.partida.ficha1= this.jugador1
    this.partida.ficha2= this.jugador2
  }

  cargarArreglo(){
    let contador:number = 0;
    for (let i = 0; i < 10; i++) {
      this.celdas[i] = [];
      for (let y = 0; y < 10; y++) {
        contador++;
        var celda = new Celda()
        if (contador == 1) {
          this.partida.ficha1.posicion = contador;
          this.partida.ficha2.posicion = contador;
        }
        celda.numero = contador;
        this.celdas[i].push(celda);
      }
    }
  }
 
}

  import { Component, OnInit } from '@angular/core';
  import Ws from '@adonisjs/websocket-client';
  @Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
  })
  export class UsuariosComponent implements OnInit {
    // ws = Ws('ws://localhost:3333')
    ws:Ws
    nombreusuario:string;
    mensajes:Array<string>=[];
    listUsuarios: Array<any>=[]
    usuario:any = {
      id :"",
      nombre:""
    }
    constructor() { } 

    ngOnInit() {
    this.ObtenerUser();
    this.iniciarConexion();

    }

    iniciarConexion(){
      this.ws = new Ws('ws:/localhost:3333').connect();
      this.ws.on('open',data => {
        console.log('se conecto!c:');
        this.subscribirCanal();
          this.ws.getSubscription('juego').emit('message',this.usuario)
      })
      this.ws.on('error',data => {
        console.log('Error de conexión :c')
      })
      

    }
  //data es el objeto con la info del usuario
    subscribirCanal(){
      let canal  = this.ws.subscribe('juego')
      console.log('SUBSCRITO AL CANAL JUEGO ')
      canal.on('message',data => {
        console.log(data)
        if(!this.listUsuarios.some(e => e.nombre === data.nombre)){
          this.listUsuarios.push(data)
          this.ws.getSubscription('juego').emit('message',this.usuario)
        }
        
      });
      canal.on('error',data => {
        console.log('error al suscribir canal')
      })

      canal.on("partida",usuario =>{
        
      })

        // canal.on('close', () => {
        //   // isConnected = false
        //   console.log('cerrado')
        // })
    }

    ObtenerUser(){
      this.usuario.id= localStorage.getItem('id_user');
      this.usuario.nombre= localStorage.getItem('usuario');

    }

    inciarPartida(usuario:any){
      this.ws.getSubscription('juego').emit('partida',usuario) 

    }
  }

  import { Component, OnInit } from '@angular/core';
  import Ws from '@adonisjs/websocket-client';
  import { ActivatedRoute, Router } from '@angular/router';
  import { HttpClient } from '@angular/common/http';

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
    celdas:Array<any>=[]
    usuario:any = {
      id :"",
      nombre:""
    }

    constructor(private  route: ActivatedRoute,
      private router: Router,private http:HttpClient) { } 

    ngOnInit() {
    this.ObtenerUser();
    this.iniciarConexion();
    // this.subscribirCanal()

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
      console.log('SUSCRITO AL CANAL JUEGO ')
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
      canal.on("partida",data =>{
        if(data.tipoSolicitud == "Peticion"){
          if(data.jugador2.id == this.usuario.id){
            localStorage.setItem("turno","2");
            localStorage.setItem("retador",data.jugador1.nombre)
            localStorage.setItem("id_retador",data.jugador1.id)
            this.ws.getSubscription('juego').emit('partida',{tipoSolicitud:"Aceptada",jugador1:data.jugador1,jugador2:this.usuario})
            this.ws.close()
            this.router.navigate(['/tb/:id']);
           }
          }else if(data.tipoSolicitud == "Aceptada"){
            if(data.jugador1.id== this.usuario.id){
              localStorage.setItem("turno","1");
              localStorage.setItem("retador",data.jugador2.nombre)
              localStorage.setItem("id_retador",data.jugador2.id)
              this.ws.close();
              this.router.navigate(['/tb/:id'])
            }
          }
        
        
      })     
    }

    ObtenerUser(){
      this.usuario.id= localStorage.getItem('id_user');
      this.usuario.nombre= localStorage.getItem('usuario');

    }

    inciarPartida(usuarioretado:any){
      this.ws.getSubscription('juego').emit('partida',{tipoSolicitud:"Peticion", jugador1:this.usuario,jugador2:usuarioretado}) 
      // this.router.navigate(['/tb/:id'])
    }


  }

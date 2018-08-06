import { RouterModule, Routes } from '@angular/router';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from'@angular/common/http';
//import {AuthRoutingModule} from './auth-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TableroComponent } from './components/tablero/tablero.component';

import { ServicioService } from './Services/servicio.service';
import { LoginAuthService } from './Services/login-auth.service';
// import { AuthService } from './Services/auth.service';

import { AuthGuard } from './Guards/auth.guard';


const routes: Routes = 
[//, canActivate: [AuthGuard]
  { path: 'Registrarse', component: RegistroComponent },
  { path: 'inicio', component: InicioComponent},
  { path: 'tb', component: TableroComponent },
  {path:  'login',component:LoginComponent}
  // { path: '',component: LoginComponent, pathMatch: 'full' },
  // { path: '**',   redirectTo: '', pathMatch: 'full' }
 ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    InicioComponent,
    RegistroComponent,
    TableroComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    HttpModule
    
  ],
  providers: [ServicioService , AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

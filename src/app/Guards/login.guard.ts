import { Injectable } from '@angular/core';    
import { Observable } from 'rxjs';
import { AuthService } from './../Services/auth.service';
import { LoginComponent } from './../components/login/login.component';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router:Router){ }
   
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('token')){
        this.router.navigate(['/usuarios'], {queryParams: {returnUrl:state.url}})
        return false;
  
    }
    return true;
   

  }
}


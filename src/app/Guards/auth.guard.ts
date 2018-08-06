import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../Services/auth.service';
import { LoginComponent } from './../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private auth:LoginComponent)
  {}
}
//   canActivate(
//     // next: ActivatedRouteSnapshot,
//     // state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     // return this.auth.setBool();
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let user: User = JSON.parse(localStorage.getItem("user"));
    
    if (user != null && user.email != null && user.id != null) {
        return true;
    }

    alert("Sua sessão expirou");
    this._router.navigate(['/']);
    localStorage.removeItem("user");

    return false;
  }

}
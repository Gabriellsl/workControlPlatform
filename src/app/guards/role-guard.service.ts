import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {


  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user: User = JSON.parse(localStorage.getItem("user"));

    if(user){
      if (user.isAdmin == next.data.role){
        return true;
      }else{
        alert("Sem permissão para carregar está página");
        this.router.navigate(['/']);
        localStorage.removeItem("user");
        
        return false;
      }
    }

    alert("Sua sessão expirou");
    this.router.navigate(['/']);
    localStorage.removeItem("user");
    
    return false;
  }

}
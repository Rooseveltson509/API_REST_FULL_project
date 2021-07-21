import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router ,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor ( private router :Router, private authService : AuthService) {}
  canActivate (route : ActivatedRouteSnapshot, state : RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.getLoggedInStatus() && this.authService.getRole()=='admin'){
        return true
      }else{
        this.router.navigate(['/admin_login']);
        return false;
      }
    }

}

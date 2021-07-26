import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private loginService: LoginService,
    private router: Router,
    private snack: MatSnackBar
    ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.loginService.isLoggedIn() && this.loginService.getUserRole()=='ADMIN' ){
          return true;
      }
      this.loginService.logout();
      this.router.navigate(["/login"]);
      this.snack.open('lỗi xác thực yêu cầu đăng nhập', 'X', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        //custom snackbar thêm class vào để thay đổi màu sắc
        panelClass: ['snackBar-custom'],
      });
    return false;
  }
  
}

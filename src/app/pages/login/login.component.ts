import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: '',
  };
  hide = true;
  constructor(private snack: MatSnackBar, private loginService: LoginService,
    private router: Router) {}

  ngOnInit(): void {}

  formSubmit() {
    if (this.user.username.trim() == '' || this.user.username == null) {
      this.snack.open('xin lỗi username không được để trống', 'X', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        //custom snackbar thêm class vào để thay đổi màu sắc
        panelClass: ['snackBar-custom'],
      });
      return;
    }
    if (this.user.password.trim() == '' || this.user.password == null) {
      this.snack.open('xin lỗi password không được để trống', 'X', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        //custom snackbar thêm class vào để thay đổi màu sắc
        panelClass: ['snackBar-custom'],
      });
      return;
    }
    this.loginService.generateToken(this.user).subscribe(
      (data: any) => {
      
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          if(this.loginService.getUserRole()=="ADMIN"){

           
            
            this.router.navigate(["/admin"]);
            this.loginService.loginStatusSubject.next(true);
          }
          else if(this.loginService.getUserRole()=="USER"){
          
            
            this.router.navigate(["/user-dashboard"]);
            this.loginService.loginStatusSubject.next(true);
          }
          else{
           
            this.loginService.logout();
            
          }

        });
      },
      (err) => {
        this.snack.open('đăng nhập thất bại tài khoản hoặc mật khẩu không chính xác', 'X', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          //custom snackbar thêm class vào để thay đổi màu sắc
          panelClass: ['snackBar-custom'],
        });
      }
    );
  }
 
}

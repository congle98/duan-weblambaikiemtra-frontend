import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user = {
    username: '',
    password: '',
    email: '',
  };
  hide=true;

  //có thể custom snackbar bằng cách này
  snackBarConfig = new MatSnackBarConfig();
  


  constructor(private userService: UserService, private snack: MatSnackBar, private router:Router) {}

  ngOnInit(): void {}
  formSubmit() {
    
    if (this.user.username == null || this.user.username == '') {
      this.snack.open("xin lỗi username không được để trống","X",{
        duration: 2000,
        verticalPosition:'top',
        horizontalPosition:"right",
        //custom snackbar thêm class vào để thay đổi màu sắc
        panelClass:['snackBar-custom']
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data) => {
        Swal.fire('Thành công', 'Đăng ký tài khoản thành công, bắt đầu ngay thôi nào!', 'success');
        this.router.navigate(['/login']);
      },
      (err) => {
        
        this.snack.open(err.error.message,"X",{
          duration: 2000,
          verticalPosition:'top',
          horizontalPosition:"right",
          //custom snackbar thêm class vào để thay đổi màu sắc
          panelClass:['snackBar-custom']
        });
      }
    );
  }
}

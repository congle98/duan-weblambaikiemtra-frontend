import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user:any;
 

  //dùng 2 cách để kiểm tra login logout, 1 là dùng luôn phương thức của loginService bằng các public loginService,
  // cách thứ 2 là tạo 1 biến subject để theo rõi, mỗi khi login hay logout thì biến sẽ thay đổi và mỗi lần biến thay đổi thì kiểm tra lại dữ liệu

  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
 
    this.loginService.loginStatusSubject.asObservable().subscribe((data:any)=>{
      this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
   
    // 
    // 
    })
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(["/login"]);
    // this.loginService.loginStatusSubject.next(false);
    // window.location.reload();

  }

}

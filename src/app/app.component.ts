import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'duan-demo-frontend';
  blur = 10;
  // loginOrHome = false;
  constructor(private router: Router) {}
  // login() {
  //   if (this.loginOrHome == false) {
  //     this.router.navigate(['/login']);
  //     // this.loginOrHome = true;
  //   } else {
  //     // this.loginOrHome = false;
  //     this.router.navigate(['']);
  //   }
  // }
}

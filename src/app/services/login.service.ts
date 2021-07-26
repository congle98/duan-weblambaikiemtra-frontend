import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginStatusSubject = new Subject<Boolean>();

  constructor(private http:HttpClient) { }

  getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  generateToken(user:any){
  
    return this.http.post(`${baseUrl}/generate-token`,user);

  }

  loginUser(token:any){
  
    localStorage.setItem('token',token);
    return true;
  }

  isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr==undefined||tokenStr==null||tokenStr==""){
      return false;
    }
    else{
      return true;
    }
  }

  logout(){
    console.log("vao logout");
    localStorage.removeItem('token');
    localStorage.removeItem("user");
    this.loginStatusSubject.next(false);
    return true;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setUser(user:any){
      localStorage.setItem("user",JSON.stringify(user));
  }

  getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr!==null){
      return JSON.parse(userStr);
    }
    else{
      // this.logout();
      return null;
    }
  }

  getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  
}

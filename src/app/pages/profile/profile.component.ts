import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoginService } from 'src/app/services/login.service';
import {finalize} from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  avatarFile:any;
  userDetail:any;
  


  

  constructor(private loginService: LoginService,  private storage:AngularFireStorage, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    console.log(this.user);
    // this.loginService.getCurrentUser().subscribe((data)=>{
    //   this.user = data;
    // },
    // (error)=>{
    //   alert(error);
    // }
    // )
  }
  setAvatar(event:any){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
       reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) =>  this.user.avatar = e.target.result;
      this.avatarFile = event.target.files[0];
     
     
    } else {
      this.user.avatar = null;
    }
  }
  updateAvatar(){
    if (this.user.avatar != null) {
      const filePath = `${this.avatarFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.avatarFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
           
            this.user.avatar = url;
            
            this.updateToDataBase();
           
          });
        })).subscribe();
    }
  }
  updateToDataBase(){
    let user={
      id:"",
      avatar:""
    };
    user.id = this.user.id;
    user.avatar =this.user.avatar;
   
    this.userService.updateUser(user).subscribe((user)=>{
      Swal.fire('Thành công', 'Update thành công!', 'success');
      this.loginService.setUser(user);
      this.loginService.loginStatusSubject.next(true);
    },(error)=>{

    });
  }


}

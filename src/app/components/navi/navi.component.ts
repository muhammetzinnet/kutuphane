import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Kind } from 'src/app/models/kind';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { KindService } from 'src/app/services/kind.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  email = this.localStorageService.get("email");
  user: User= new User();
  customer:Customer

  kinds:Kind[] = [];
  filterText="";
  constructor(
    private kindService:KindService,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router,
    private userService:UserService
    ) { }

  ngOnInit(): void {
    this.getKinds();
    this.checkToLogin();
    this.checkToEmail();
    this.getEmail();
  }

  getKinds(){
    this.kindService.getKinds().subscribe(response => {
      this.kinds = response.data
    })
  }
  checkToLogin(){
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      return false;
    }
  }
  checkToEmail(){
    if(this.localStorageService.get("email")){

      return true;
    }else{
      return false;
    }
  }

  logOut(){
   this.localStorageService.clean()
    this.toastrService.success("Başarıyla Çıkış Yapıldı");
    this.router.navigate(["/"])
  }

  getEmail(){
    if(this.email){
      this.userService.getByEmail(this.email).subscribe(response=>{
        this.user = response;
      })
    }
  }

}

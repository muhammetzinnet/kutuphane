import { SingleResponseModel } from './../models/singleResponseModel';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/tokenModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl='https://localhost:44335/api/auth/'
  constructor(private httpClient:HttpClient) { }

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel);
  }

  isAuthendicated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
}

import { SingleResponseModel } from './../models/singleResponseModel';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserId: number;
  jwtHelperService: JwtHelperService = new JwtHelperService();
  apiUrl = 'https://localhost:44335/api/auth/';
  constructor(
    private httpClient: HttpClient,

  ) {}

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'login',
      loginModel
    );
  }

  register(register: Register): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'register',
      register
    );
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  setCurrentUserId() {
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter((x) =>
      x.endsWith('/nameidentifier')
    )[0];
    this.currentUserId = Number(decoded[propUserId]);
  }

  getCurrentUserId(): number {
    return this.currentUserId;
  }
  getDecodedToken() {
    try {
      return this.jwtHelperService.decodeToken();
    } catch (Error) {
      return null;
    }
  }
  async setUserStats() {
    if (this.loggedIn()) {
      this.setCurrentUserId();
    }
  }
  loggedIn(): boolean {
    let isExpired = this.jwtHelperService.isTokenExpired(

    );
    return !isExpired;
  }
}

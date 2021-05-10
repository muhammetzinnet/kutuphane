import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lend } from '../models/lend';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class LendService {
  apiUrl='https://localhost:44335/api/lends/';
  constructor(private httpClient : HttpClient) { }

  getLends():Observable<ListResponseModel<Lend>>{
    let newPath = this.apiUrl+"lenddetails"
    return this.httpClient.get<ListResponseModel<Lend>>(newPath);
  }

  add(lend:Lend):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "lends/add",lend);
  }

  delete(lend:Lend):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl +"lends/delete",lend);
  }

  update(lend:Lend):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "lends/update",lend);
  }
}

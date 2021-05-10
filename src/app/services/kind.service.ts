import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kind } from '../models/kind';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class KindService {

  apiUrl='https://localhost:44335/api/kinds/';
  constructor(private httpClient : HttpClient) { }

  getKinds():Observable<ListResponseModel<Kind>> {
    let newPath = this.apiUrl + "getkinddetails"
    return this.httpClient.get<ListResponseModel<Kind>>(newPath)
  }

  add(kind:Kind):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"kinds/add",kind);
  }
  delete(kind:Kind):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"kinds/delete",kind);
  }
  update(kind:Kind):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"kinds/update",kind);
  }
}

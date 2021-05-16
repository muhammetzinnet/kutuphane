import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kind } from '../models/kind';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class KindService {


  apiUrl="https://localhost:44335/api/kinds/"

  constructor(private httpClient:HttpClient) { }


  getKinds():Observable<ListResponseModel<Kind>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<Kind>>(newPath);
  }

  getByKindId(id:number):Observable<SingleResponseModel<Kind>>{
    let newPath = this.apiUrl + "getbykindid?id=" + id
    return this.httpClient.get<SingleResponseModel<Kind>>(newPath)
  }

  add(kind:Kind):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add", kind)
  }

  update(kind:Kind):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update", kind)
  }

  delete(kind:Kind):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete", kind)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { ReturnBook } from '../models/returnBook';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ReturnBookService {

  apiUrl='https://localhost:44335/api/returnbooks/';
  constructor(private httpClient : HttpClient) { }

  getReturnBooks():Observable<ListResponseModel<ReturnBook>> {
    let newPath = this.apiUrl+"returnbookdetails"
    return this.httpClient.get<ListResponseModel<ReturnBook>>(newPath);
  }

  getByReturnBookId(id:number):Observable<SingleResponseModel<ReturnBook>> {
    let newPath = this.apiUrl+"getbyreturnbook?id="+id
    return this.httpClient.get<SingleResponseModel<ReturnBook>>(newPath)
  }
}

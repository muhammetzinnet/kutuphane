import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  apiUrl = 'https://localhost:44335/api/';
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl);
  }

  getByCategoryId(id:number):Observable<SingleResponseModel<Category>>{
    let newPath = this.apiUrl + "getbycategoryid?id="+id
    return this.httpClient.get<SingleResponseModel<Category>>(newPath)
  }

  add(category: Category): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'categories/add',
      category
    );
  }

  delete(category: Category): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'categories/delete',
      category
    );
  }

  update(category: Category): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'categories/update',
      category
    );
  }
}

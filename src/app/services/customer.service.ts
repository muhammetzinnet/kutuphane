import { Customer } from 'src/app/models/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  
  apiUrl = 'https://localhost:44335/api/customers/';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getByCustomerId(
    customerId: number
  ): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getbycustomerid?id=' + customerId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }

  getByUserId(userId: number): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getbyuserid?id=' + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }

  update(customer: Customer): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, customer);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  apiUrl = 'https://localhost:44335/api/';
  constructor(private httpClient: HttpClient) {}

  getBooks(): Observable<ListResponseModel<Book>> {
    let newPath = this.apiUrl + 'books/getall';
    return this.httpClient.get<ListResponseModel<Book>>(newPath);
  }

  getBooksByCategory(categoryId: number): Observable<ListResponseModel<Book>> {
    let newPath = this.apiUrl + 'books/getbycategory?categoryId=' + categoryId;
    return this.httpClient.get<ListResponseModel<Book>>(newPath);
  }

  getBookDetailsByBookIdSingle(
    id: number
  ): Observable<SingleResponseModel<Book>> {
    let newPath = this.apiUrl + 'getbybookid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Book>>(newPath);
  }

  getBookDetails():Observable<ListResponseModel<Book>>{
    let newPath = this.apiUrl + "getbookdetails"
    return this.httpClient.get<ListResponseModel<Book>>(newPath);
  }

  getBookDetailsByBookId(id: number):Observable<ListResponseModel<Book>>{
    let newPath = this.apiUrl + "getbookdetailsbybookid?id="+id
    return this.httpClient.get<ListResponseModel<Book>>(newPath)
  }

  add(book: Book): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'books/add', book);
  }

  delete(book: Book): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'books/delete',
      book
    );
  }

  update(book: Book): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'books/update',
      book
    );
  }
}

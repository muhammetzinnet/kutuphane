
import { Book } from './../../models/book';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book',
  templateUrl:'./book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {

  books:Book[] = []
  dataLoaded=false;
  filterText="";

  constructor(private bookService:BookService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['categoryId']){
        this.getBooksByCategory(params['categoryId'])
      }else{
        this.getBooks()
      }
    })
  }

  getBooks(){
    this.bookService.getBooks().subscribe(response=>{
      this.books = response.data;
      this.dataLoaded=true;
      this.filterText="";
    });
  }

  getBooksByCategory(categoryId:number){
    this.bookService.getBooksByCategory(categoryId).subscribe(response=>{
      this.books = response.data;
      this.dataLoaded=true;
    });
  }
}

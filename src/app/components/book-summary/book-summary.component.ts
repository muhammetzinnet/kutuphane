import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookItem } from 'src/app/models/bookItem';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-book-summary',
  templateUrl: './book-summary.component.html',
  styleUrls: ['./book-summary.component.css']
})
export class BookSummaryComponent implements OnInit {

  bookItems:BookItem[];
  constructor(private libraryService:LibraryService) { }

  ngOnInit(): void {
    this.getLibrary()
  }

  getLibrary(){
    this.bookItems = this.libraryService.list();
  }

  removeFromBook(book: Book){
    this.libraryService.removeFromBook(book);
  }

}

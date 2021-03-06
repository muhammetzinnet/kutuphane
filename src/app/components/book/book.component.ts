import { Book } from './../../models/book';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  dataLoaded = false;
  filterText = '';

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,

  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getBooksByCategory(params['categoryId']);
      } else if (params['bookId']) {
        this.getBookDetailsByBookId(params['bookId']);
      } else {
        this.getBooks();
      }
    });
  }

  getBooks() {
    this.bookService.getBooks().subscribe((response) => {
      this.books = response.data;
      this.dataLoaded = true;
      this.filterText = '';
    });
  }

  getBooksByCategory(categoryId: number) {
    this.bookService.getBooksByCategory(categoryId).subscribe((response) => {
      this.books = response.data;
      this.dataLoaded = true;
    });
  }

  addLendPerson(book: Book) {
    if (book.bookId!=book.bookId) {
      this.toastrService.success('Aynı kitaptan birdaha eklenemez');
    } else {
      this.toastrService.success('Kitap kişiye verildi', book.bookName);

    }
  }

  getBookDetailsByBookId(bookId: number) {
    this.bookService.getBookDetailsByBookId(bookId).subscribe((response) => {
      this.books = response.data;
    });
  }
}

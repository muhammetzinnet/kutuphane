import { BookItems } from './../models/bookItems';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { BookItem } from '../models/bookItem';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor() {}

  addToBook(book: Book) {
    let item = BookItems.find((b) => b.book.bookId === book.bookId);
    if (item) {
      item.quantity += 1;
    } else {
      let bookItem = new BookItem();
      bookItem.book = book;
      bookItem.quantity = 1;
      BookItems.push(bookItem);
    }
  }

  removeFromBook(book: Book) {
    let item = BookItems.find((b) => b.book.bookId === book.bookId);
    BookItems.splice(BookItems.indexOf(item),1);
  }

  list(): BookItem[] {
    return BookItems;
  }
}

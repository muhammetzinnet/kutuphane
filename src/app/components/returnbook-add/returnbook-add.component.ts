import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Customer } from 'src/app/models/customer';
import { ResponseModel } from 'src/app/models/responseModel';
import { ReturnBook } from 'src/app/models/returnBook';
import { User } from 'src/app/models/user';
import { BookService } from 'src/app/services/book.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { ReturnBookService } from 'src/app/services/return-book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-returnbook-add',
  templateUrl: './returnbook-add.component.html',
  styleUrls: ['./returnbook-add.component.css'],
})
export class ReturnbookAddComponent implements OnInit {
  book: Book;
  customers: Customer[] = [];
  lendDate: Date;
  returnBookDate: Date;
  minDate: string | any;
  maxDate: string | null;
  firstDateSelected: boolean = false;
  dateAvailable: ResponseModel;
  user: User = new User();
  email = this.localStorageService.get('email');
  returnBook: ReturnBook = {
    bookId: 0,
    returnBookId: 0,
    firstName: '',
    lastName: '',
    lendPeriod: 0,
    returnDate: new Date(),
    totalDay: 0,
  };

  constructor(
    private returnBookService: ReturnBookService,
    private toastrService: ToastrService,
    private router: Router,
    private bookService: BookService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.getEmail();
  }

  getEmail() {
    if (this.email) {
      this.userService.getByEmail(this.email).subscribe((response) => {
        this.user = response;
      });
    }
  }

  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.returnBook != undefined) {
      let stringToDate = new Date(this.returnBookDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.returnBook;
    }
  }

  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }

  addRental() {
    let returnBookModel = {
      returnBookId:this.returnBook,
      lendDate:this.lendDate,
      returnBookDate:this.returnBookDate,
    };
    this.router.navigate(["details/payment/", JSON.stringify(returnBookModel)]);
    this.toastrService.success("Kitap iade alındı", "Başarılı işlem");
  }

  selectBookId(){
    return this.book.bookId
  }

}

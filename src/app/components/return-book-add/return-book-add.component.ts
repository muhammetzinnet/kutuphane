import { ResponseModel } from './../../models/responseModel';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { ReturnBook } from 'src/app/models/returnBook';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-return-book-add',
  templateUrl: './return-book-add.component.html',
  styleUrls: ['./return-book-add.component.css']
})
export class ReturnBookAddComponent implements OnInit {

  book: Book;
  customers: Customer[] = [];
  lendDate: Date;
  returnBookDate: Date;
  minDate: string | any;
  maxDate: string | null;
  firstDateSelected: boolean = false;
  dateAvailable: ResponseModel;
  user: User = new User();

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
    private toastrService: ToastrService,
    private router: Router,
    private datePipe: DatePipe,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    
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

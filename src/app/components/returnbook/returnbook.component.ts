import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Customer } from 'src/app/models/customer';
import { ResponseModel } from 'src/app/models/responseModel';
import { ReturnBook } from 'src/app/models/returnBook';
import { User } from 'src/app/models/user';
import { ReturnBookService } from 'src/app/services/return-book.service';

@Component({
  selector: 'app-returnbook',
  templateUrl: './returnbook.component.html',
  styleUrls: ['./returnbook.component.css']
})
export class ReturnbookComponent implements OnInit {

  returnBooks:ReturnBook[]=[];
  book:Book;
  customer:Customer;


  constructor(private returnBookService: ReturnBookService) { }

  ngOnInit(): void {
    this.getReturnBook();
  }

  getReturnBook(){
    this.returnBookService.getReturnBooks().subscribe(response=>{
      this.returnBooks=response.data;
    })
  }

}

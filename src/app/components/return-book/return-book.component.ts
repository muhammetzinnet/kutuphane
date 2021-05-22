import { ReturnBookService } from './../../services/return-book.service';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Customer } from 'src/app/models/customer';
import { ReturnBook } from 'src/app/models/returnBook';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent implements OnInit {

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

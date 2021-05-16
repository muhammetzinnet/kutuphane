import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Customer } from 'src/app/models/customer';
import { Lend } from 'src/app/models/lend';
import { User } from 'src/app/models/user';
import { BookService } from 'src/app/services/book.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-lend-add',
  templateUrl: './lend-add.component.html',
  styleUrls: ['./lend-add.component.css']
})
export class LendAddComponent implements OnInit {

  book:Book;
  customers: Customer[]
  customer:Customer
  lendDate: Date;
  returnBookDate: Date;
  customerId:number;
  minDate: string | any;
  maxDate: string | null;
  firstDateSelected: boolean = false;
  user:User= new User();
  email = this.localStorageService.get("email");
  lend: Lend = {
  lendId:0,
  customerId:0,
  userId:0,
  bookId:0,
  categoryName:"",
  bookName:"",
  kindName:"",
  userName:"",
  customerName:"",
  lendDate: new Date(),
  returnBookDate: new Date(),
  lendPeriod:0,
  totalDay:new Date()
  }


  constructor(
    private customerService: CustomerService,
    private bookService: BookService,
    private datePipe: DatePipe,
    private toastrService : ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private localStorageService: LocalStorageService,
    private userService:UserService
  ) {}

  ngOnInit(): void {

    this.getEmail();
    this.activatedRoute.params.subscribe(params => {
        this.getBookDetailsByBookId(params["bookId"])
        this.getCustomers();
    })
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }
  getBookDetailsByBookId(carId:number){
    this.bookService.getBookDetailsByBookId(carId).subscribe((response)=> {
      this.book = response.data[0]
    })
  }

  getLendMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  addLend() {
    let lendModel = {
      customerId: this.customerId,
      bookId: this.book.bookId,
      lendDate: this.lendDate,
      returnBookDate: this.returnBookDate
    };
    this.router.navigate(["lends/add/", JSON.stringify(lendModel)]);
    this.toastrService.success("Kitabı teslim alabilirsiniz.", "Başarılı işlem");
  }
  setCustomerId(customerId: any) {
    this.customerId = customerId;
    console.log(customerId);
  }

  getEmail(){
    if(this.email){
      this.userService.getByEmail(this.email).subscribe(response=>{
        this.user = response;
      })
    }
  }
}

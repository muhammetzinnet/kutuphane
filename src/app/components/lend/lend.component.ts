import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Lend } from 'src/app/models/lend';
import { LendService } from 'src/app/services/lend.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-lend',
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.css']
})
export class LendComponent implements OnInit {

  lends:Lend[]=[];
  book:Book;
  customer:Customer[]= [];
  currentLend: Lend;

  constructor(private lendService:LendService) { }

  ngOnInit(): void {
    this.getLends();
  }

  getLends(){
    this.lendService.getLends().subscribe(response=>{
      this.lends = response.data
    })
  }

  setCurrentLend(lend:Lend){
    this.currentLend=lend;
  }

  getCurrentLendClass(lend:Lend){
    if (lend===this.currentLend){
      return "list-group-item active"
    }else{
      return "list-group-item"}
  }

}

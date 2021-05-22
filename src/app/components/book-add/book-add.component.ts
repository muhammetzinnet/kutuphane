import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
})
export class BookAddComponent implements OnInit {


  bookAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createBookAddForm();
  }

  createBookAddForm() {
    this.bookAddForm = this.formBuilder.group({
      categoryId: ['', Validators.required],
      kindName: ['', Validators.required],
      bookName: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      yearOfPrinting: ['', Validators.required],
      piece: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  add() {

    if (this.bookAddForm.valid) {
      let bookModel = Object.assign({}, this.bookAddForm.value)
      this.bookService.add(bookModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responsError=>{
        this.toastrService.error(responsError.error)
      })

    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
}

import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { Kind } from 'src/app/models/kind';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css'],
})
export class BookUpdateComponent implements OnInit {

  book: Book;
  categories: Category[] = [];
 

  bookUpdateForm: FormGroup;
  bookId: number;
  categoryId: number;
  bookName: string;
  piece: number;
  description: string;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,

  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {

        this.createBookForm();

      }
    });
  }


  createBookForm() {
    this.bookUpdateForm = this.formBuilder.group({
      bookId: ['', Validators.required],
      categoryId: ['', Validators.required],
      bookName: ['', Validators.required],
      piece: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  update() {
    if (this.bookUpdateForm.valid) {
      let bookUpModel = Object.assign({}, this.bookUpdateForm.value);
      this.bookService.add(bookUpModel).subscribe(
        (response) => {
          this.toastrService.success(response.message + 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Hatalı İşlem!', 'Lütfen kontrol edin...');
    }
  }
}

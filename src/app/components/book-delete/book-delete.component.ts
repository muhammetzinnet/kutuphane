import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css'],
})
export class BookDeleteComponent implements OnInit {

  bookDeleteForm: FormGroup;
  book: Book;
  bookId: number;
  bookName: string;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['bookid']) {
        this.getBookDetailsByBookId(params['bookid']);
        this.createBookForm();
      }
    });
  }

  getBookDetailsByBookId(id: number) {
    this.bookService
      .getBookDetailsByBookIdSingle(this.activatedRoute.snapshot.params['bookid'])
      .subscribe((response) => {
        this.book = response.data;
        this.bookId = this.book.bookId;
        this.bookName = this.book.bookName;
      });
  }

  createBookForm() {
    this.bookDeleteForm = this.formBuilder.group({
      bookId: ['', Validators.required],
      bookName:['', Validators.required]
    });
  }

  delete() {
    if (this.bookDeleteForm.valid) {
      let bookModel = Object.assign({}, this.bookDeleteForm.value);
      this.bookService.delete(bookModel).subscribe(
        (response) => {
          this.toastrService.success('Kitap silindi', 'Başarılı');
          this.backToList();
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
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
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
  backToList() {
    this.router.navigate(['books/list']);
  }
}

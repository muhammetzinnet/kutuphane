import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { Kind } from 'src/app/models/kind';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { KindService } from 'src/app/services/kind.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css'],
})
export class BookUpdateComponent implements OnInit {
  book: Book;
  categories: Category[] = [];
  kinds: Kind[] = [];

  bookUpdateForm: FormGroup;
  bookId: number;
  categoryId: number;
  kindName: string;
  bookName: string;
  author: string;
  publisher: string;
  yearOfPrinting: Date;
  piece: number;
  description: string;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private kindService: KindService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getBookDetailsByBookId(params['id']);
        this.createBookForm();
        this.getCategories();
        this.getKinds();
      }
    });
  }

  getKinds() {
    this.kindService.getKinds().subscribe((response) => {
      this.kinds = response.data;
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  createBookForm() {
    this.bookUpdateForm = this.formBuilder.group({
      bookId: ['', Validators.required],
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

  getBookDetailsByBookId(id: number) {
    this.bookService
      .getBookDetailsByBookIdSingle(this.activatedRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.book = response.data;
        this.bookId = this.book.bookId;
        this.categoryId = this.book.categoryId;
        this.kindName = this.book.kindName;
        this.author = this.book.author;
        this.publisher = this.book.publisher;
        this.yearOfPrinting = this.book.yearOfPrinting;
        this.piece = this.book.piece;
        this.description = this.book.description;
      });
  }

  update() {
    if (this.bookUpdateForm.valid) {
      let bookModel = Object.assign({}, this.bookUpdateForm.value);
      this.bookService.update(bookModel).subscribe(
        (response) => {
          this.toastrService.success('Kitap güncellendi', 'Başarılı');
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

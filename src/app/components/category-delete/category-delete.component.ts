import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css'],
})
export class CategoryDeleteComponent implements OnInit {
  categoryDeleteForm: FormGroup;
  category: Category;
  categoryId: number;
  categoryName: string;

  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getByCategoryId(params['id']);
        this.createCategoryForm();
      }
    });
  }

  getByCategoryId(id: number) {
    this.categoryService
      .getByCategoryId(this.activatedRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.category = response.data;
        this.categoryId = this.category.categoryId;
        this.categoryName = this.category.categoryName;
      });
  }

  createCategoryForm() {
    this.categoryDeleteForm = this.formBuilder.group({
      categoryId: ['', Validators.required],
    });
  }

  delete() {
    if (this.categoryDeleteForm.valid) {
      let categoryModel = Object.assign({}, this.categoryDeleteForm.value);
      this.categoryService.delete(categoryModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
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
    this.router.navigate(['categories/list']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
})
export class CategoryAddComponent implements OnInit {


  categoryAddForm : FormGroup;

  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCategoryAddForm();
  }

  createCategoryAddForm(){
    this.categoryAddForm = this.formBuilder.group({
      categoryName:["",Validators.required]
    })
  }

  add(){
    if (this.categoryAddForm.valid){
      let categoryModel = Object.assign({}, this.categoryAddForm.value)
      this.categoryService.add(categoryModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.backToList();
      }, responseError=>{
        if(responseError.error.Errors.length>0){
          for(let i=0; i<responseError.errors.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].errorMessage,"Doğrulama hatası");
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
  backToList(){
    this.router.navigate(['kinds/list']);
  }
}

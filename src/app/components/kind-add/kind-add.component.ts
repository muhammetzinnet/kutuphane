import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KindService } from 'src/app/services/kind.service';

@Component({
  selector: 'app-kind-add',
  templateUrl: './kind-add.component.html',
  styleUrls: ['./kind-add.component.css']
})
export class KindAddComponent implements OnInit {
  [x: string]: any;

  kindAddForm: FormGroup;

  constructor(private kindService:KindService, private toastrService:ToastrService,
     private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.createKindAddForm();
  }

  createKindAddForm(){
    this.kindAddForm = this.formBuilder.group({
      kindName:["",Validators.required]
    })
  }

  add(){
    if (this.kindAddForm.valid){
      let bookKind = Object.assign({}, this.kindAddForm.value)
      this.kindService.add(bookKind).subscribe(response=>{
        this.toastrService.success("Kitap türü eklendi","Başarılı")
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

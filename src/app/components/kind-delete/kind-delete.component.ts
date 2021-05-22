import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Kind } from 'src/app/models/kind';
import { KindService } from 'src/app/services/kind.service';

@Component({
  selector: 'app-kind-delete',
  templateUrl: './kind-delete.component.html',
  styleUrls: ['./kind-delete.component.css'],
})
export class KindDeleteComponent implements OnInit {

  kindDeleteForm: FormGroup;
  kind: Kind;
  kindId: number;
  kindName: string;

  constructor(
    private kindService: KindService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['kindid']) {
        this.getByKindId(params['kindid']);
        this.createKindForm();
      }
    });
  }

  getByKindId(id: number) {
    this.kindService
      .getByKindId(this.activatedRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.kind = response.data;
        this.kindId = this.kind.kindId;
        this.kindName = this.kind.kindName;
      });
  }

  createKindForm() {
    this.kindDeleteForm = this.formBuilder.group({
      kindId: ['', Validators.required],
    });
  }

  delete() {
    if (this.kindDeleteForm.valid) {
      let kindModel = Object.assign({}, this.kindDeleteForm.value);
      this.kindService.delete(kindModel).subscribe(
        (response) => {
          this.toastrService.success('Kitap türü silindi', 'Başarılı');
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
    this.router.navigate(['kinds/list']);
  }
}

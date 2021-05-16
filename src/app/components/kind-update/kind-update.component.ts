import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Kind } from 'src/app/models/kind';
import { KindService } from 'src/app/services/kind.service';

@Component({
  selector: 'app-kind-update',
  templateUrl: './kind-update.component.html',
  styleUrls: ['./kind-update.component.css'],
})
export class KindUpdateComponent implements OnInit {


  kindUpdateForm: FormGroup;
  kind: Kind;
  kindId: number;
  kindName: string;

  constructor(
    private kindService: KindService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getByKindId(params['kindId']);
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
    this.kindUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      kindName: ['', Validators.required],
    });
  }

  update() {
    if (this.kindUpdateForm.valid) {
      let kindModel = Object.assign({}, this.kindUpdateForm.value);
      this.kindService.update(kindModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.backToList();
        },
        (responseError) => {
          this.toastrService.error(
            'Bu işleme yetkiniz yoktur',
            'Doğrulama hatası'
          );
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

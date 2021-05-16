import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kind } from 'src/app/models/kind';
import { KindService } from 'src/app/services/kind.service';

@Component({
  selector: 'app-kind-list',
  templateUrl: './kind-list.component.html',
  styleUrls: ['./kind-list.component.css']
})
export class KindListComponent implements OnInit {

  kinds:Kind[]=[];

  constructor(private kindService: KindService, private router:Router) { }

  ngOnInit(): void {
    this.getKinds();
  }

  getKinds(){
    this.kindService.getKinds().subscribe(response=>{
      this.kinds = response.data;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Kind } from 'src/app/models/kind';
import { KindService } from 'src/app/services/kind.service';

@Component({
  selector: 'app-kind',
  templateUrl: './kind.component.html',
  styleUrls: ['./kind.component.css']
})
export class KindComponent implements OnInit {

  kinds:Kind[]=[];



  constructor(private kindService: KindService) { }

  ngOnInit(): void {
    this.getKinds();
  }

  getKinds(){
    this.kindService.getKinds().subscribe(response=>{
      this.kinds = response.data;

    })
  }

}

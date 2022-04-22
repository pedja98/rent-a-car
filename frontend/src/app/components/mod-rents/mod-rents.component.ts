import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mod-rents',
  templateUrl: './mod-rents.component.html',
  styleUrls: ['./mod-rents.component.css']
})
export class ModRentsComponent implements OnInit {

  visible:string = 'rents'

  constructor() { }

  change(val: string): void {
    this.visible = val;
  }

  ngOnInit(): void {
  }

}

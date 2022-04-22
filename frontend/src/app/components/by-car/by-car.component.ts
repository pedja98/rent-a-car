import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ModeratorService } from 'src/app/services/moderator/moderator.service';

@Component({
  selector: 'app-by-car',
  templateUrl: './by-car.component.html',
  styleUrls: ['./by-car.component.css']
})
export class ByCarComponent implements OnInit {

  rents = [];

  displayedColumns: string[] = [
    "plate_num",
    "brand",
    "model",
    "total_cost",
  ];

  dataSource = new MatTableDataSource<any>();

  constructor(private _mod: ModeratorService) { }

  ngOnInit(): void {
    this._mod.getByCar().subscribe((res) => {
      this.rents = res;
      this.dataSource.data = res
      
    })
  }

}

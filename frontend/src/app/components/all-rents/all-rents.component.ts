import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ModeratorService } from 'src/app/services/moderator/moderator.service';

@Component({
  selector: 'app-all-rents',
  templateUrl: './all-rents.component.html',
  styleUrls: ['./all-rents.component.css']
})
export class AllRentsComponent implements OnInit {

  rents = [];

  displayedColumns: string[] = [
    "username",
    "brand",
    "model",
    "cost",
    "cancelled",
    "created_at",
    "date_of_renting",
    "date_of_return",
  ];

  dataSource = new MatTableDataSource<any>();

  constructor(private _mod: ModeratorService) { }

  ngOnInit(): void {
    this._mod.getAllRents().subscribe((res) => {
      this.rents = res;
      this.dataSource.data = res
      this.rents.forEach((rent) => {
        if(rent.cancelled === 'n') {
          rent.cancelled = 'NO'
        }
        else {
          rent.cancelled = 'YES'
        }
      })
    })
  }

}

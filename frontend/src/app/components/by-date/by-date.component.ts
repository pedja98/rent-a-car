import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ModeratorService } from 'src/app/services/moderator/moderator.service';

@Component({
  selector: 'app-by-date',
  templateUrl: './by-date.component.html',
  styleUrls: ['./by-date.component.css']
})
export class ByDateComponent implements OnInit {


  rents = [];

  displayedColumns: string[] = [
    "created_at",
    "total_cost",
  ];

  dataSource = new MatTableDataSource<any>();

  constructor(private _mod: ModeratorService) { }

  ngOnInit(): void {
    this._mod.getByDate().subscribe((res) => {
      this.rents = res;
      this.dataSource.data = res
    })
  }
}

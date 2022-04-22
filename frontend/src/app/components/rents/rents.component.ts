import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentsService } from 'src/app/services/rents/rents.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';

@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.css']
})
export class RentsComponent implements OnInit {

  displayedColumns: string[] = ['brand', 'model', 'color', 'date_of_renting', 'date_of_return', 'price', 'cancel', 'cancelled'];
  dataSource = [];

  username: string
  rents: any[] = []

  constructor(
    private _aroute: ActivatedRoute,
    private _rents: RentsService,
    private _dialog: MatDialog
  ) { }

  cancleRent(i: number): void {
    this._rents.cancleRent(this.rents[i].ID).subscribe((res) => {
      if (res.updated) {
        this.rents[i].cancelled = 'c'
        this.rents[i].dis = true
        this.rents[i].can = 'YES'

        const dialogConfig = new MatDialogConfig()

        dialogConfig.width = '350px'
        dialogConfig.height = '190px'
        dialogConfig.data = {
          msg: "Rent is successfully cancelled"
        }

        this._dialog.open(DialogMsgComponent, dialogConfig)
      }
    })
  }

  ngOnInit(): void {
    this.username = this._aroute.snapshot.paramMap.get("usrnme")
    this._rents.getUserRents(this.username).subscribe((res) => {
      this.rents = res
      this.dataSource = this.rents;

      this.rents.forEach(rent => {
        if (rent.cancelled == 'c') {
          rent.can = 'YES'
        }
        else {
          rent.can = 'NO'
        }

        let date1 = new Date(rent.date_of_return);
        let date2 = new Date(rent.date_of_renting);

        const currDate = new Date()

        if (rent.cancelled == 'c' || ((currDate.getFullYear() > date2.getFullYear()) ||
          (currDate.getFullYear() === date2.getFullYear() && currDate.getMonth() > date2.getMonth()) ||
          (currDate.getFullYear() === date2.getFullYear() && currDate.getMonth() === date2.getMonth() && currDate.getDate() > date2.getDate())
        )) {
          rent.dis = true
        }
        else {
          rent.dis = false
        }

      })
    })
  }

}

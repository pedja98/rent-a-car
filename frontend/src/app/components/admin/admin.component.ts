import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin/admin.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ModifyComponent } from "../modify/modify.component";
import { AddModeratorComponent } from "../add-moderator/add-moderator.component";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  user: any;
  users: any[] = [];

  displayedColumns: string[] = [
    "username",
    "name",
    "surname",
    "type",
    "modify",
    "delete",
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private _admin: AdminService,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  logOut(): void {
    this._admin.removeAdminLS().subscribe(() => {
      this._admin.removeTokenLS().subscribe(() => {
        this._router.navigate([""]);
      })
    });
  }

  delete(i: number): void {
    this._admin.deleteUser(this.users[i].username).subscribe((res) => {
      if (res.delete == true) {
        this.users.splice(i, 1);
        this.dataSource.data = this.users;
      }
    });
  }

  modify(i: number): void {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.width = '500px'
    dialogConfig.height = '440px'
    dialogConfig.data = {
      user: this.users[i]
    }
    dialogConfig.disableClose = true

    let dialog = this._dialog.open(ModifyComponent, dialogConfig)

    dialog.afterClosed().subscribe(res => {
      if (res == 'updated') {
        this.users = []
        this.dataSource.data = []

        this._admin.getUsers().subscribe((res2) => {
          this.users = res2;
          this.dataSource.data = res2;
        });
      }
    })
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.width = '600px'
    dialogConfig.height = '450px'

    let dialog = this._dialog.open(AddModeratorComponent, dialogConfig)

    dialog.afterClosed().subscribe(res => {
      if (res == 'mod added') {
        this.users = []
        this.dataSource.data = []

        this._admin.getUsers().subscribe((res2) => {
          this.users = res2;
          this.dataSource.data = res2;
        });
      }
    })
  }

  ngOnInit(): void {
    this._admin.getAdminLS().subscribe((res) => {
      this.user = res
      this._admin.getUsers().subscribe((res) => {
        this.users = res
        this.dataSource.data = res
      });
    });
  }
}

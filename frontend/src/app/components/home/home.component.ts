import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _dialog: MatDialog) {}

  openSignIn(): void {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '350px'
    dialogConfig.height = '275px'
    this._dialog.open(SignInComponent, dialogConfig)
  }

  openSignUp(): void {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '600px'
    dialogConfig.height = '450px'
    this._dialog.open(SignUpComponent, dialogConfig)
  }

  ngOnInit(): void {
  }

}

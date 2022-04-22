import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignInService } from '../../services/sign-in/sign-in.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  msg: string = ""

  username: string = ""
  password: string = ""

  constructor(
    public _dialogRef: MatDialogRef<SignInComponent>,
    private _signIn: SignInService,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  signIn(): void {
    this.msg = "";
    if ((this.username == '' || this.username == null || this.username == undefined) ||
      ((this.password == '' || this.password == null || this.password == undefined))) {
      this.msg = "please fill all fields"
      return;
    }

    let user = {
      username: this.username,
      password: this.password,
    }

    this._signIn.signIn(user).subscribe((res) => {
      if (res.found == false) {
        this.msg = "wrong credentials"
        return
      }

      this._dialogRef.close()

      const user = { username: res.username, type: res.type}
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', JSON.stringify(res.token));

      const dialogConfig = new MatDialogConfig()

      dialogConfig.width = '350px'
      dialogConfig.height = '190px'
      dialogConfig.data = {
        msg: "Welcome " + res.name
      }

      this._dialog.open(DialogMsgComponent, dialogConfig)

      if (res.type === 'admin') {
        this._router.navigate(['/admin'])
      }

      else if (res.type === 'user') {
        if (this._router.url === '/car') {
          this._router.navigate(['/user/car'])
        }
        else {
          this._router.navigate(['/user'])
        }
      }
      else {
        this._router.navigate(['/moderator'])
      }
    })
  }

}

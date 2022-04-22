import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-moderator',
  templateUrl: './add-moderator.component.html',
  styleUrls: ['./add-moderator.component.css']
})
export class AddModeratorComponent implements OnInit {

  msg: string = ""

  name: string = ""
  surname: string = ""
  username: string = ""
  password: string = ""
  email: string = ""
  confirm: string = ""
  address: string = ""

  acc: boolean = false


  constructor
    (
      public _dialogRef: MatDialogRef<AddModeratorComponent>,
      private _user: UserService
    ) { }

  addModerator(): void {
    this.msg = ""
    this.acc = false

    if ((this.username == null || this.username == '') || (this.password == null || this.password == '')
      || (this.email == null || this.email == '') || (this.name == null || this.name == '')
      || (this.surname == null || this.surname == '') || (this.confirm == null || this.confirm == '')
      || (this.address == null || this.address == '')) {
      this.msg = 'please fill all fields'
      return
    }


    const passRegex = /^(?=.*\d)(?=.*[@$!%*#?&]).{8,}/
    if (!passRegex.test(this.password)) {
      this.msg = 'password should have min 8 characters and 1 of special (@$!%*#?&)'
      return
    }

    const emailRegex = /^\w+@\w+\.\w+$/
    if (!emailRegex.test(this.email)) {
      this.msg = 'email is in wrong format'
      return
    }

    if (this.password != this.confirm) {
      this.msg = 'password does not match'
      return
    }

    let user = {
      name: this.name,
      surname: this.surname,
      username: this.username,
      password: this.password,
      type: 'moderator',
      email: this.email,
      address: this.address
    }

    this._user.addMod(user).subscribe(
      (res) => {

        if (res.emailTaken) {
          this.msg = "mail is already in use please try another"
          return;
        }

        if (res.usernameTaken) {
          this.msg = "username is taken please try another"
          return;
        }

        if (res.created === true) {

          this.name = ""
          this.surname = ""
          this.username = ""
          this.password = ""
          this.email = ""
          this.confirm = ""
          this.address = ""

          this.acc = true

          this._dialogRef.close('mod added')

          return;
        }
      }
    )


  }

  ngOnInit(): void {
  }

}

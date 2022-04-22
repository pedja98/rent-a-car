import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  msg: string = ""

  username: string
  password: string
  confirm: string
  name: string
  surname: string
  email: string
  address: string
  oldUsername: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    public _dialogRef: MatDialogRef<ModifyComponent>,
    private _admin: AdminService,
  ) { }

  save(): void {
    this.msg = ""

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

    if (this.username == this._data.user.username && this.password == this._data.user.password && this.email == this._data.user.email && this.address == this._data.user.address && this.name == this._data.user.name && this.surname == this._data.user.surname) {
      this._dialogRef.close()
      return
    }

    let modify = {
      username: this.username,
      password: this.password,
      name: this.name,
      surname: this.surname,
      email: this.email,
      address: this.address,
      oldUsername: this.oldUsername
    }

    this._admin.modifyUser(modify).subscribe(res => {
      if (res.updated) {
        this._dialogRef.close('updated')
      }
      else {
        alert(res.err)
      }
    })

  }

  ngOnInit(): void {
    this.username = this._data.user.username
    this.oldUsername = this.username
    this.password = this._data.user.password
    this.email = this._data.user.email
    this.address = this._data.user.address
    this.name = this._data.user.name
    this.surname = this._data.user.surname
    this.confirm = this.password
  }

}

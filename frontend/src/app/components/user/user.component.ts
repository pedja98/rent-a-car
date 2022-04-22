import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private _user: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    
  }

  logOut() {
    this._user.removeUserLS().subscribe(() => {
      this._user.removeTokenLS().subscribe(() => {
        this._router.navigate([""]);
      })
    })
  }

  myRents() {
    this._user.getUserLS().subscribe((user: any) => {
      this._router.navigate([`/user/${user.username}/rents`])
    })
  }
}

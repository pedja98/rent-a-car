import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModeratorService } from 'src/app/services/moderator/moderator.service';
@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  constructor(
    private _user: ModeratorService,
    private _router: Router
    ) { }

 
    logOut(): void {
      this._user.removeModeLS().subscribe(() => {
        this._user.removeTokenLS().subscribe(() => {
          this._router.navigate([""]);
        })
      })
    }
  
  ngOnInit(): void {
  }

}

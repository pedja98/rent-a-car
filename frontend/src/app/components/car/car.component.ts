import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CarService } from "src/app/services/car/car.service";
import { RentsService } from "src/app/services/rents/rents.service";
import { SignInService } from "src/app/services/sign-in/sign-in.service";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "app-car",
  templateUrl: "./car.component.html",
  styleUrls: ["./car.component.css"],
})
export class CarComponent implements OnInit {
  car: any = null;
  pic: string = "../../assets/pictures/no-photo.jpg";

  msg: string = "";

  rentDate: Date;
  returnDate: Date;

  constructor(
    private _rents: RentsService,
    private _car: CarService,
    private _user: UserService,
    private _router: Router,
    private _signIn: SignInService
  ) { }

  async rentCar() {
    this.msg = "";

    if (!this._signIn.signedIn()) {
      this.msg = "please sign in if you want to rent a car";
      return;
    }

    if (this.rentDate === undefined || this.returnDate === undefined) {
      this.msg = "please fill all fields";
      return;
    }

    const currDate = new Date();
    const rentDate = new Date(this.rentDate);
    const returnDate = new Date(this.returnDate);

    if (
      currDate.getFullYear() > rentDate.getFullYear() ||
      (currDate.getFullYear() === rentDate.getFullYear() &&
        currDate.getMonth() > rentDate.getMonth()) ||
      (currDate.getFullYear() === rentDate.getFullYear() &&
        currDate.getMonth() === rentDate.getMonth() &&
        currDate.getDate() > rentDate.getDate())
    ) {
      this.msg = "you can't rent a car before current date";
      return;
    }

    if (
      returnDate.getFullYear() < rentDate.getFullYear() ||
      (returnDate.getFullYear() === rentDate.getFullYear() &&
        returnDate.getMonth() < rentDate.getMonth()) ||
      (returnDate.getFullYear() === rentDate.getFullYear() &&
        returnDate.getMonth() === rentDate.getMonth() &&
        returnDate.getDate() < rentDate.getDate())
    ) {
      this.msg = "the return date can't be before renting date";
      return;
    }

    var time = returnDate.getTime() - rentDate.getTime();
    var days = Math.ceil(time / (1000 * 3600 * 24));
    const cost = parseInt(this.car.price) * days

    let user: any = await this._user.getUserLS().toPromise();

    this._rents
      .sendRent({
        username: user.username,
        plate_num: this.car.plate_num,
        rentDate: this.rentDate,
        returnDate: this.returnDate,
        cost: cost
      })
      .subscribe((res) => {
        if (!res.created) {
          this.msg = "car is already rented in that period";
          return;
        } else {
          this._router.navigate(['/user/' + user.username + '/rents'])
          return;
        }
      });
  }

  ngOnInit(): void {
    this._car.getCarLS().subscribe((res) => {
      this.car = res;
      if (this.car.pic != null) {
        this.pic = this.car.pic;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car/car.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  showSpinner: boolean = true

  brand: string = ""
  model: string = ""
  color: string = ""
  priceTo: string = ""

  cars: any[] = []
  pics: string[] = []

  start: number = 0
  middle: number = 3
  end: number = 6

  carRoute: string = ""

  constructor(
    private _car: CarService,
    private _router: Router,
  ) { }

  moveLeft(): void {
    this.start -= 6
    this.middle -= 6
    this.end -= 6
  }

  moveRight(): void {
    this.start += 6
    this.middle += 6
    this.end += 6
  }

  search(): void {
    this.start = 0
    this.middle = 3
    this.end = 6

    let price;

    price = Number(this.priceTo)
    if (isNaN(price)) {
      price = -1;
    }

    if (price <= 0) {
      price = -1;
    }

    let params = {
      brand: this.brand.toLocaleLowerCase(),
      model: this.model.toLocaleLowerCase(),
      color: this.color.toLocaleLowerCase(),
      priceTo: price
    }

    this.cars = []
    this.pics = []

    this._car.searchCars(params).subscribe(res => {
      this.brand = ''
      this.priceTo = ''
      this.model = ''
      this.color = ''

      this.cars = res

      this.cars.forEach((car) => {
        if (car.pic !== null) {
          this.pics.push(car.pic)
        }
        else {
          this.pics.push('../../assets/pictures/no-photo.jpg')
        }
      })
    })
  }

  carNavigate(index: number): void {
    if (this._router.url === '/') {
      this._car.setCarLS(this.cars[index]).subscribe(() => {
        this._router.navigate(["/car"])
      })
    }
    else if (this._router.url === '/user') {
      this._car.setCarLS(this.cars[index]).subscribe(() => {
        this._router.navigate(["/user/car"])
      })
    }
  }

  ngOnInit(): void {
    this.showSpinner = true

    this.pics = []
    this.cars = []

    this._car.removeCarLS().subscribe(() => {
      this._car.getCars().subscribe(res => {
        this.showSpinner = false;
        this.cars = res
        this.cars.forEach((car) => {
          if (car.pic !== null) {
            this.pics.push(car.pic)
          }
          else {
            this.pics.push('../../assets/pictures/no-photo.jpg')
          }
        })
      })
    })

  }

}

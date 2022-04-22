import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-mod-cars',
  templateUrl: './mod-cars.component.html',
  styleUrls: ['./mod-cars.component.css']
})
export class ModCarsComponent implements OnInit {

  showSpinner: boolean = true

  brand: string = ""
  model: string = ""
  color: string = ""
  priceTo: string = ""

  plate_num: string = ""
  brand1: string = ""
  model1: string = ""
  color1: string = ""
  price: string = ""

  cars: any[] = []
  pics: string[] = []

  start: number = 0
  middle: number = 3
  end: number = 6

  image: any;

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

  selImg(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  addCar(): void {
    const file = new FormData();
    file.append('file', this.image)
    file.append('plate_num', this.plate_num)
    file.append('brand', this.brand1)
    file.append('model', this.model1)
    file.append('price', this.price)
    file.append('color', this.color1)

    this._car.addCar(file).subscribe(() => {

      this.plate_num = ""
      this.brand1 = ""
      this.model1 = ""
      this.color1= ""
      this.price = ""

      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.showSpinner = true

    this.pics = []
    this.cars = []

    this._car.getCarsPost().subscribe(res => {
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
  }
}

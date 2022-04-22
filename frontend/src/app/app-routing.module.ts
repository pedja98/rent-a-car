import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CarComponent } from './components/car/car.component';

import { HomeComponent } from './components/home/home.component';
import { ModCarsComponent } from './components/mod-cars/mod-cars.component';
import { ModRentsComponent } from './components/mod-rents/mod-rents.component';
import { ModeratorComponent } from './components/moderator/moderator.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RentsComponent } from './components/rents/rents.component';
import { SearchComponent } from './components/search/search.component';
import { UserComponent } from './components/user/user.component';
import { SignInAdminGuard } from './guards/sign-in-admin/sign-in-admin.guard';
import { SignInModeGuard } from './guards/sign-in-mode/sign-in-mode.guard';

import { SignInGuard } from './guards/sign-in/sign-in.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", component: SearchComponent },
      { path: "car", component: CarComponent },
    ]
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [SignInGuard],
    children: [
      { path: "", component: SearchComponent },
      { path: "car", component: CarComponent },
      { path: ":usrnme/rents", component: RentsComponent }
    ]
  },
  { path: "admin", component: AdminComponent, canActivate: [SignInAdminGuard]},
  { 
    path: "moderator", 
    component: ModeratorComponent, 
    canActivate: [SignInModeGuard],
    children: [
      { path: "", component: ModRentsComponent },
      { path: "cars", component: ModCarsComponent }
    ]
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

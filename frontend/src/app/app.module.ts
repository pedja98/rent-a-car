import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RentsComponent } from './components/rents/rents.component';

import { SignInGuard } from './guards/sign-in/sign-in.guard';
import { CarComponent } from './components/car/car.component';
import { AdminComponent } from './components/admin/admin.component';
import { ModifyComponent } from './components/modify/modify.component'

import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { DialogMsgComponent } from './components/dialog-msg/dialog-msg.component';
import { AddModeratorComponent } from './components/add-moderator/add-moderator.component';
import { ModeratorComponent } from './components/moderator/moderator.component';
import { ModRentsComponent } from './components/mod-rents/mod-rents.component';
import { AllRentsComponent } from './components/all-rents/all-rents.component';
import { ByCarComponent } from './components/by-car/by-car.component';
import { ByDateComponent } from './components/by-date/by-date.component';
import { ModCarsComponent } from './components/mod-cars/mod-cars.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SignInComponent,
    SignUpComponent,
    UserComponent,
    HomeComponent,
    PageNotFoundComponent,
    RentsComponent,
    CarComponent,
    AdminComponent,
    ModifyComponent,
    DialogMsgComponent,
    AddModeratorComponent,
    ModeratorComponent,
    ModRentsComponent,
    AllRentsComponent,
    ByCarComponent,
    ByDateComponent,
    ModCarsComponent,
  ],
  entryComponents: [SignInComponent, SignUpComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [SignInGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./shared/shared.module";
import {LoginModule} from "./login/login.module";
import {HomeModule} from "./home/home.module";
import {AuthService} from "./shared/auth.service";
import {RegisterModule} from "./register/register.module";
import {HasValidTokenGuard} from "./shared/guards/has-valid-token.guard";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    LoginModule,
    RegisterModule,
    HomeModule
  ],
  providers: [
    AuthService,
    HasValidTokenGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

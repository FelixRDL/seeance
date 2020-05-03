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
import {UserService} from "./shared/user.service";
import {IsUserRegisteredGuard} from "./shared/guards/is-user-registered.guard";
import {IsUserUnregisteredGuard} from "./shared/guards/is-user-unregistered.guard";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCommonModule} from "@angular/material/core";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MaterialModule} from "./material/material.module";

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
    HomeModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    UserService,
    HasValidTokenGuard,
    IsUserRegisteredGuard,
    IsUserUnregisteredGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

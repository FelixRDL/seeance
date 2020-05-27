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
import {MaterialModule} from "./material/material.module";
import {CourseService} from "./shared/course.service";
import {CourseModule} from "./course/course.module";
import {RepositoryService} from "./shared/repository.service";
import {ProjectModule} from "./project/project.module";
import {SettingsModule} from "./settings/settings.module";

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
    MaterialModule,
    CourseModule,
    ProjectModule,
    SettingsModule
  ],
  providers: [
    AuthService,
    UserService,
    CourseService,
    RepositoryService,
    HasValidTokenGuard,
    IsUserRegisteredGuard,
    IsUserUnregisteredGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

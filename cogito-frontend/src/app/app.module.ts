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
import {PluginsService} from "./shared/plugins.service";
import {PluginConfigModule} from "./plugin-config/plugin-config.module";
import {DefaultWidgetRegistry, SchemaFormModule, WidgetRegistry} from "ngx-schema-form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {DEFAULT_TIMEOUT, TimeoutInterceptor} from "./shared/TimeoutInterceptor";
import {MarkdownModule} from "ngx-markdown";
import {AnalysisDetailComponent} from "./analysis-detail/analysis-detail/analysis-detail.component";
import {AnalysisDetailModule} from "./analysis-detail/analysis-detail.module";
import {StudyFeedbackModule} from "./study-feedback/study-feedback.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SchemaFormModule.forRoot(),
    MarkdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
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
    AnalysisDetailModule,
    StudyFeedbackModule,
    SettingsModule,
    PluginConfigModule
  ],
  providers: [
    AuthService,
    UserService,
    CourseService,
    RepositoryService,
    PluginsService,
    HasValidTokenGuard,
    IsUserRegisteredGuard,
    IsUserUnregisteredGuard,
    {provide: WidgetRegistry, useClass: DefaultWidgetRegistry},
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 60000 }]
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

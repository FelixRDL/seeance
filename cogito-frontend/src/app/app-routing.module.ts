import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginRedirectComponent} from "./login/login-redirect/login-redirect.component";
import {StartComponent} from "./home/start/start.component";
import {RecentContentsComponent} from "./home/recent-contents/recent-contents.component";
import {RegisterComponent} from "./register/register/register.component";
import {HasValidTokenGuard} from "./shared/guards/has-valid-token.guard";
import {IsUserRegisteredGuard} from "./shared/guards/is-user-registered.guard";
import {IsUserUnregisteredGuard} from "./shared/guards/is-user-unregistered.guard";
import {CreateCourseComponent} from "./course/create-course/create-course.component";
import {EditCourseComponent} from "./course/edit-course/edit-course.component";
import {ProjectComponent} from "./project/project/project.component";
import {SettingsComponent} from "./settings/settings/settings.component";
import {AnalysisConfigComponent} from "./plugin-config/analysis-config/analysis-config.component";


const routes: Routes = [
  /*TODO: add guard routes for authorized user!*/
  // {path: '', component: RecentContentsComponent},
  {path: '', component: RecentContentsComponent, canActivate: [HasValidTokenGuard, IsUserRegisteredGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [HasValidTokenGuard, IsUserRegisteredGuard]},
  {path: 'courses', component: CreateCourseComponent, canActivate: [HasValidTokenGuard, IsUserRegisteredGuard]},
  {path: 'courses/:id', component: EditCourseComponent, canActivate: [HasValidTokenGuard, IsUserRegisteredGuard]},
  {path: 'courses/:courseId/projects/:projectId', component: ProjectComponent, canActivate: [HasValidTokenGuard,
      IsUserRegisteredGuard]},
  {path: 'courses/:courseId/projects/:projectId/analyses/:preprocessorId/configure',
    component: AnalysisConfigComponent, canActivate: [HasValidTokenGuard, IsUserRegisteredGuard]},
  {path: 'start', component: StartComponent},
  {path: 'register', component: RegisterComponent, canActivate: [IsUserUnregisteredGuard]},
  {path: 'auth/callback', component: LoginRedirectComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

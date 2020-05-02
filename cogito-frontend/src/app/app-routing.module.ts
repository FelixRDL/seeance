import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginRedirectComponent} from "./login/login-redirect/login-redirect.component";
import {StartComponent} from "./home/start/start.component";
import {RecentContentsComponent} from "./home/recent-contents/recent-contents.component";
import {RegisterComponent} from "./register/register/register.component";
import {HasValidTokenGuard} from "./shared/guards/has-valid-token.guard";
import {IsUserRegisteredGuard} from "./shared/guards/is-user-registered.guard";
import {IsUserUnregisteredGuard} from "./shared/guards/is-user-unregistered.guard";


const routes: Routes = [
  /*TODO: add guard routes for authorized user!*/
  // {path: '', component: RecentContentsComponent},
  {path: '', component: RecentContentsComponent, canActivate: [HasValidTokenGuard, IsUserRegisteredGuard]},
  {path: 'start', component: StartComponent},
  {path: 'register', component: RegisterComponent, canActivate: [IsUserUnregisteredGuard]},
  {path: 'auth/callback', component: LoginRedirectComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

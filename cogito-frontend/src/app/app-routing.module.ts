import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginRedirectComponent} from "./login/login-redirect/login-redirect.component";
import {StartComponent} from "./home/start/start.component";
import {RecentContentsComponent} from "./home/recent-contents/recent-contents.component";


const routes: Routes = [
  /*TODO: add guard routes for authorized user!*/
  // {path: '', component: RecentContentsComponent},
  {path: '', component: StartComponent},
  {path: 'auth/callback', component: LoginRedirectComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

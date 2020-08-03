import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRedirectComponent } from './login-redirect/login-redirect.component';



@NgModule({
  declarations: [LoginRedirectComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoginRedirectComponent
  ]
})
export class LoginModule { }

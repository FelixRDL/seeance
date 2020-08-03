import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/user.service";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isSubmitting = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  register() {
    this.isSubmitting = true;
    this.userService.registerUser().subscribe((user) => {
      this.router.navigate(['']);
    }, (e) => {
      console.error(e);
      this.router.navigate(['']);
    })
  }

  cancel() {
    this.authService.clearToken();
    this.router.navigate(['']);
  }

}

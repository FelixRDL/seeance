import { Component } from '@angular/core';
import {UserService} from "./shared/user.service";
import {User} from "./shared/core/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authenticatedUser: User;

  constructor(userService: UserService) {

    userService.authenticatedUser.subscribe((user: User) => {
      this.authenticatedUser = user;
    })
  }

  title = 'cogito-frontend';
}

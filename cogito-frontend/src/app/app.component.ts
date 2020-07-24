import { Component } from '@angular/core';
import {UserService} from "./shared/user.service";
import {User} from "./shared/core/User";
import {CourseService} from "./shared/course.service";
import {PluginsService} from "./shared/plugins.service";
import {ProjectService} from "./shared/project.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authenticatedUser: User;
  isShowingStudy: boolean = false;

  constructor(
    userService: UserService,
    courseService: CourseService

  ) {

    userService.authenticatedUser.subscribe((user: User) => {
      this.authenticatedUser = user;
      courseService.updateCourses();
      this.isShowingStudy = true;
    });
  }

  title = 'cogito-frontend';
}

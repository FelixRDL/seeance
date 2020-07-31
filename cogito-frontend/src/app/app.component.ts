import { Component } from '@angular/core';
import {UserService} from './shared/user.service';
import {User} from './shared/core/User';
import {CourseService} from './shared/course.service';
import {PluginsService} from './shared/plugins.service';
import {ProjectService} from './shared/project.service';
import {StudyService} from "./shared/study.service";
import {Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authenticatedUser: User;
  isShowingStudy = false;

  constructor(
    userService: UserService,
    courseService: CourseService,
    studyService: StudyService,
    router: Router
  ) {

    userService.authenticatedUser.subscribe((user: User) => {
      this.authenticatedUser = user;
      courseService.updateCourses();
      this.isShowingStudy = true;
    });


    document.addEventListener('click', (evnt) => {
      studyService.submitUiEvent(evnt);
    });

    router.events.subscribe((event) => {
      studyService.submitSystemEvent('route', {
        url: event['url']
      })
    });
  }
  title = 'cogito-frontend';
}

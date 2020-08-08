import { Component } from '@angular/core';
import {UserService} from './shared/user.service';
import {User} from './shared/core/User';
import {CourseService} from './shared/course.service';
import {StudyService} from "./shared/study.service";
import {Router, RoutesRecognized, ActivationEnd, ActivationStart, RouterEvent} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authenticatedUser: User;
  isShowingStudy = false;
  hoveredItems = {}

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


    document.addEventListener('mouseover', (evnt) => {
      this.hoveredItems[evnt.target['id']] = new Date().getTime()
      if(evnt.target['tagName'] === 'IFRAME') {
        studyService.submitSystemEvent('mouseover', {
          tagname: evnt.target['id']
        })
      }
    });

    document.addEventListener('mouseout', (evnt) => {
      let dwellTime = 0
      if(this.hoveredItems[evnt.target['id']] ) {
        dwellTime = (new Date()).getTime() - this.hoveredItems[evnt.target['id']]
        delete this.hoveredItems[evnt.target['id']]
      }
      if(evnt.target['tagName'] === 'IFRAME') {
        studyService.submitSystemEvent('mouseout', {
          tagname: evnt.target['id'],
          dwelltime: dwellTime
        })
      }
    });

    document.addEventListener('click', (evnt) => {
      studyService.submitUiEvent(evnt);
    });

    router.events.subscribe((event: RouterEvent) => {
      if(event instanceof ActivationEnd) {
        studyService.submitSystemEvent('route', {
          url: event.snapshot.url.reduce((a, x) => a + '/' + x, '')
        })
      }
    });
  }
  title = 'cogito-frontend';
}

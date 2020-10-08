import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../core/Course';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'app-nav-course-list',
  templateUrl: './nav-course-list.component.html',
  styleUrls: ['./nav-course-list.component.scss']
})
export class NavCourseListComponent implements OnInit {
  @Input() courses: Course[];
  selectedCourse: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    // Solution proposed by Siddarth Pandey
    // (https://stackoverflow.com/questions/42947133/parent-components-gets-empty-params-from-activatedroute)
    this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        const params = event.state.root.firstChild.params;
        if (params.id) {
          this.selectedCourse = params.id;
        } else if (params.courseId) {
          this.selectedCourse = params.courseId;
        }
      }
    });
  }

}

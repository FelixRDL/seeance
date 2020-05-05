import { Component, OnInit } from '@angular/core';
import {Project} from "../../shared/core/Project";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  private projects: Project[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  onProjectSelected(project: Project) {
    console.log(project);
    // TODO: handle project already existing
    this.projects.push(project);
  }

}

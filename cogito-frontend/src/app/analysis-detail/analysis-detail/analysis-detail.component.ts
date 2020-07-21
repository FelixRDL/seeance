import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Analysis} from "../../shared/core/Analysis";
import {ProjectService} from "../../shared/project.service";
import {Project} from "../../shared/core/Project";
import {Course} from "../../shared/core/Course";
import {CourseService} from "../../shared/course.service";

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent implements OnInit {
  analysis: Analysis;
  project: Project;
  course: Course;
  html: string;

  constructor(
    private route: ActivatedRoute,
    private projects: ProjectService,
    private courses: CourseService
  ) {
    this.route.params.subscribe((params) => {
      this.projects.getAnalysisById(params.courseId, params.projectId, params.analysisId).subscribe((d) => {
        this.analysis = d;
      });
      this.projects.getProjectById(params.courseId, params.projectId).subscribe((d) => {
        this.project = d;
      });
      this.courses.getCourseById(params.courseId).subscribe((d) => {
        this.course = d;
      });
      this.projects.getAnalysisView(params.courseId, params.projectId, params.analysisId).subscribe((d) => {
        this.html = d;
      });
    });
  }

  ngOnInit(): void {
  }

}

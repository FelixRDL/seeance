import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {Project} from "../../shared/core/Project";
import {Course} from "../../shared/core/Course";
import {Analysis} from "../../shared/core/Analysis";
import {CourseService} from "../../shared/course.service";
import {ProjectService} from "../../shared/project.service";
import {AnalysisTemplate} from "../../shared/core/AnalysisTemplate";
import {PluginsService} from "../../shared/plugins.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-analysis-config',
  templateUrl: './analysis-config.component.html',
  styleUrls: ['./analysis-config.component.scss']
})
export class AnalysisConfigComponent implements OnInit {
  activeProject: Project;
  activeCourse: Course;
  activeAnalysis: Analysis;
  activeAnalysisTemplate: AnalysisTemplate;
  schema: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private projectService: ProjectService,
    private pluginService: PluginsService,

    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseService.getCourseById(params.courseId).subscribe((course: Course) => {
        this.activeCourse = course;
      })
      this.projectService.getProjectById(params.courseId, params.projectId).subscribe((project: Project) => {
        this.activeProject = project;
      });
      this.projectService.getAnalysisById(params.courseId, params.projectId, params.analysisId).subscribe((analysis: Analysis) => {
        this.activeAnalysis = analysis;
        this.schema = analysis.template.configSchema
      });
    });
  }

  save(config: any) {
    this.projectService.setAnalysisConfig(
      this.activeCourse._id,
      this.activeProject._id,
      this.activeAnalysis._id,
      config
    ).subscribe((result) => {
      const analysis: Analysis = this.activeAnalysis
      analysis.config = result
      this.activeAnalysis = analysis
      this.snackbar.open("Configuration saved successfully!", "OK")
      this.routeBack();
    })
  }

  cancel() {
    this.routeBack();
  }

  routeBack() {
    this.router.navigate(['courses', this.activeCourse._id, 'projects', this.activeProject._id]);
  }
}

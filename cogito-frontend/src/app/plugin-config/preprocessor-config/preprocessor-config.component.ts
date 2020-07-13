import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Project} from "../../shared/core/Project";
import {Course} from "../../shared/core/Course";
import {Analysis} from "../../shared/core/Analysis";
import {AnalysisTemplate} from "../../shared/core/AnalysisTemplate";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../shared/course.service";
import {ProjectService} from "../../shared/project.service";
import {PluginsService} from "../../shared/plugins.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Preprocessor} from "../../shared/core/Preprocessor";
import {PreprocessorTemplate} from "../../shared/core/PreprocessorTemplate";

@Component({
  selector: 'app-preprocessor-config',
  templateUrl: './preprocessor-config.component.html',
  styleUrls: ['./preprocessor-config.component.scss']
})
export class PreprocessorConfigComponent implements OnInit {
  activeProject: Project;
  activeCourse: Course;
  activePreprocessor: Preprocessor;
  activePreprocessorTemplate: PreprocessorTemplate;

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

      this.projectService.getPreprocessorById(params.courseId, params.projectId, params.preprocessorId).subscribe((pre: Preprocessor) => {
        this.activePreprocessor = pre
        this.pluginService.getPreprocessorByName(pre.template).subscribe((prep) => {
          console.log(prep)
          this.activePreprocessorTemplate = prep
        })
      })
    });
  }

  save(config: any) {
    this.projectService.setPreprocessorConfig(
      this.activeCourse._id,
      this.activeProject._id,
      this.activePreprocessor._id,
      config
    ).subscribe((result) => {
      const pre: Preprocessor = this.activePreprocessor
      pre.config = result
      this.activePreprocessor = pre
      this.snackbar.open("Configuration saved successfully!", "OK")
    })
  }

  cancel() {
    this.router.navigate(['courses', this.activeCourse._id, 'projects', this.activeProject._id])
  }

}

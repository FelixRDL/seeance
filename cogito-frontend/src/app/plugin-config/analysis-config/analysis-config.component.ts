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
  activeProject: BehaviorSubject<Project> = new BehaviorSubject<Project>(undefined);
  activeCourse: BehaviorSubject<Course> = new BehaviorSubject<Course>(undefined);
  activeAnalysis: BehaviorSubject<Analysis> = new BehaviorSubject<Analysis>(undefined);
  activeAnalysisTemplate: BehaviorSubject<AnalysisTemplate> = new BehaviorSubject<AnalysisTemplate>(undefined);

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
        this.activeCourse.next(course);
      })
      this.projectService.getProjectById(params.courseId, params.projectId).subscribe((project: Project) => {
        this.activeProject.next(project);
      });
      this.projectService.getAnalysisById(params.courseId, params.projectId, params.analysisId).subscribe((analysis: Analysis) => {
        this.activeAnalysis.next(analysis);
        this.pluginService.getAnalysisTemplateByName(analysis.analysis).subscribe((template: AnalysisTemplate) => {
          this.activeAnalysisTemplate.next(template);
          console.log(template)
        })
      })
    });
  }

  save(config: any) {
    this.projectService.setAnalysisConfig(
      this.activeCourse.getValue()._id,
      this.activeProject.getValue()._id,
      this.activeAnalysis.getValue()._id,
      config
    ).subscribe((result) => {
      const analysis: Analysis = this.activeAnalysis.getValue()
      analysis.config = result
      this.activeAnalysis.next(analysis)
      this.snackbar.open("Configuration saved successfully!", "OK")
    })
  }

  cancel() {
    this.router.navigate(['courses', this.activeCourse.getValue()._id, 'projects', this.activeProject.getValue()._id])
  }
}

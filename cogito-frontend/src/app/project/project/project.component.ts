import { Component} from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {BehaviorSubject} from "rxjs";
import {Project} from "../../shared/core/Project";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../../shared/core/Course";
import {CourseService} from "../../shared/course.service";
import {MatDialog} from "@angular/material/dialog";
import {AddAnalysisModalComponent} from "../plugins/add-analysis-modal/add-analysis-modal.component";
import {AnalysisTemplate} from "../../shared/core/AnalysisTemplate";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Analysis} from "../../shared/core/Analysis";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  activeProject: BehaviorSubject<Project> = new BehaviorSubject<Project>(undefined);
  activeCourse: BehaviorSubject<Course> = new BehaviorSubject<Course>(undefined);
  analyses: BehaviorSubject<Analysis[]> = new BehaviorSubject<Analysis[]>([]);
  analysisViews: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    private projectService: ProjectService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {
    this.route.params.subscribe((params) => {

      this.courseService.getCourseById(params.courseId).subscribe((course: Course) => {
        this.activeCourse.next(course);
        this.projectService.getProjectById(course._id, params.projectId).subscribe((project: Project) => {
          this.activeProject.next(project);
          this.updateAnalyses()
        });
      })
    });
  }

  updateAnalyses(): void {
    this.projectService.getAnalyses(
      this.activeCourse.getValue()._id,
      this.activeProject.getValue()._id
    ).subscribe((analyses: Analysis[]) => {
      this.analyses.next(analyses)
      analyses.forEach((analysis: Analysis) => {
        this.projectService.getAnalysisView(
          this.activeCourse.getValue()._id,
          this.activeProject.getValue()._id,
          analysis._id
        ).subscribe((html: string) => {
          const list: string[] = this.analysisViews.getValue()
          list.push(html)
          this.analysisViews.next(
            list
          )
        })
      })
    })
  }

  addAnalysis(): void {
    let dialogRef = this.dialog.open(AddAnalysisModalComponent, {});
    dialogRef.afterClosed().subscribe((result: AnalysisTemplate) => {
      if(result) {
        this.projectService.addAnalysis(
          this.activeCourse.getValue()._id,
          this.activeProject.getValue()._id,
          result.name
        ).subscribe((response) => {
          this.snackbar.open( "Analysis added successfully!", "OK");
          this.updateAnalyses()
        })
      }
    });
  }
}

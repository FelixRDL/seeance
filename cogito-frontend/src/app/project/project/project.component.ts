import { Component} from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Project} from "../../shared/core/Project";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../../shared/core/Course";
import {CourseService} from "../../shared/course.service";
import {MatDialog} from "@angular/material/dialog";
import {AddAnalysisModalComponent} from "../plugins/add-analysis-modal/add-analysis-modal.component";
import {AnalysisTemplate} from "../../shared/core/AnalysisTemplate";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Analysis} from "../../shared/core/Analysis";
import {AddPreprocessorModalComponent} from "../plugins/add-preprocessor-modal/add-preprocessor-modal.component";
import {PreprocessorTemplate} from "../../shared/core/PreprocessorTemplate";
import {Preprocessor} from "../../shared/core/Preprocessor";
import {ConfirmModalComponent} from "../../shared/modals/confirm.modal/confirm.modal.component";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  activeProject: Project;
  activeCourse: Course;
  analyses: Analysis[];
  preprocessors: BehaviorSubject<Preprocessor[]> = new BehaviorSubject<Preprocessor[]>([]);
  tiles: AnalysisTile[];

  constructor(
    private projectService: ProjectService,
    private courseService: CourseService,
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {
    this.route.params.subscribe((params) => {
      this.courseService.getCourseById(params.courseId).subscribe((course: Course) => {
        this.activeCourse = course;
        this.projectService.getProjectById(course._id, params.projectId).subscribe((project: Project) => {
          this.activeProject = project;
          this.updateAnalyses()

          this.userService.registerProjectVisit(
            this.activeCourse._id,
            this.activeProject._id,
            this.activeCourse.title,
            this.activeProject.repository.name,
            document.location.href
          ).subscribe(() => {})

        });
      })
    });
  }

  updateAnalyses(): void {
    this.preprocessors.next([])
    this.analyses = []
    this.tiles = []

    this.projectService.getPreprocessors(
      this.activeCourse._id,
      this.activeProject._id
    ).subscribe((preprocessors: Preprocessor[]) => {
      this.preprocessors.next(preprocessors)
    })
    this.projectService.getAnalyses(
      this.activeCourse._id,
      this.activeProject._id
    ).subscribe((analyses: Analysis[]) => {
      this.analyses = analyses
      this.tiles = analyses.map((analysis) => {
        return {
          analysis: analysis,
          html: ''
        } as AnalysisTile
      })
      analyses.forEach((analysis: Analysis) => {
        this.projectService.getAnalysisView(
          this.activeCourse._id,
          this.activeProject._id,
          analysis._id
        ).subscribe((html: string) => {
          let list: any[] = this.tiles
          const index: number = list.findIndex((item) => item.analysis._id == analysis._id)
          list[index] = {
            analysis: list[index].analysis,
            html: html
          }
          this.tiles = list
        })
      })
    })
  }

  addAnalysis(): void {
    let dialogRef = this.dialog.open(AddAnalysisModalComponent, {});
    dialogRef.afterClosed().subscribe((result: AnalysisTemplate) => {
      if(result) {
        this.projectService.addAnalysis(
          this.activeCourse._id,
          this.activeProject._id,
          result.name
        ).subscribe((response) => {
          this.snackbar.open( "Analysis added successfully!", "OK");
          this.updateAnalyses()
        })
      }
    });
  }

  addPreprocessor(): void {
    let dialogRef = this.dialog.open(AddPreprocessorModalComponent, {});
    dialogRef.afterClosed().subscribe((result: PreprocessorTemplate) => {
      if(result) {
        this.projectService.addPreprocessor(
          this.activeCourse._id,
          this.activeProject._id,
          result.name
        ).subscribe((response) => {
          this.snackbar.open( "Preprocessor added successfully!", "OK");
          this.updateAnalyses()
        })
      }
    });
  }

  removeAnalysis(analysisId: string) {
    const courseId: string = this.activeCourse._id
    const projectId: string = this.activeProject._id

    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        decline: 'cancel',
        accept: 'delete',
        title: 'Confirm Analysis Deletion',
        message: 'Do you really want to delete this analysis? You cannot undo this.'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.projectService.removeAnalysis(
          courseId,
          projectId,
          analysisId
        ).subscribe(() => {
          this.updateAnalyses()
          this.snackbar.open( "Analysis removed successfully!", "OK");
        })
      }
    })
  }

  removePreprocessor(preprocessorId: string) {
    const courseId: string = this.activeCourse._id
    const projectId: string = this.activeProject._id
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        decline: 'cancel',
        accept: 'delete',
        title: 'Confirm Preprocessor Deletion',
        message: 'Do you really want to delete this preprocessor? You cannot undo this.'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.projectService.removePreprocessor(
          courseId,
          projectId,
          preprocessorId
        ).subscribe(() => {
          this.updateAnalyses()
          this.snackbar.open( "Preprocessor removed successfully!", "OK");
        })
      }
    })
  }
}


interface AnalysisTile {
  html: string,
  analysis: Analysis
}

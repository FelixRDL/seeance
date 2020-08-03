import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Analysis} from "../../shared/core/Analysis";
import {ProjectService} from "../../shared/project.service";
import {Project} from "../../shared/core/Project";
import {Course} from "../../shared/core/Course";
import {CourseService} from "../../shared/course.service";
import {InfoModalComponent} from "../../shared/modals/info.modal/info.modal.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {StudyService} from "../../shared/study.service";

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('vis') iframe: ElementRef;
  analysis: Analysis;
  hasConfig: boolean = false;
  project: Project;
  course: Course;
  html: string;

  constructor(
    private route: ActivatedRoute,
    private projects: ProjectService,
    private courses: CourseService,
    private dialog: MatDialog,
    public study: StudyService
  ) {
    this.route.params.subscribe((params) => {
      this.projects.getAnalysisById(params.courseId, params.projectId, params.analysisId).subscribe((d) => {
        this.analysis = d;
        this.hasConfig = Object.keys(d.template.configSchema).length > 0;
      });
      this.projects.getProjectById(params.courseId, params.projectId).subscribe((d) => {
        this.project = d;
      });
      this.courses.getCourseById(params.courseId).subscribe((d) => {
        this.course = d;
      });
      this.study.submitSystemEvent('loadAnalysisBegin', {
        analysisId: params.analysisId,
        projectIds: params.projectId
      })

      const loadStart: Date = new Date()
      this.projects.getAnalysisView(params.courseId, params.projectId, params.analysisId).subscribe((d) => {
        const loadEnd: Date = new Date()
        this.html = d;
        this.iframe.nativeElement.setAttribute('srcdoc', d);
        this.study.submitSystemEvent('loadAnalysisComplete', {
          analysisId: params.analysisId,
          projectIds: params.projectId,
          loadTime: loadEnd.getTime() - loadStart.getTime()
        });
      });
    });
  }

  ngAfterViewInit() {
    this.iframe.nativeElement.setAttribute('srcdoc', this.html);
  }

  ngOnInit(): void {
  }

  showInfo() {
    let dialogRef: any = this.dialog.open(InfoModalComponent, {
      data: {
        message: this.analysis.template.description
      },
      minWidth: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

}

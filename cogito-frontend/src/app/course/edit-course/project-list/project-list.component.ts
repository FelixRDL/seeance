import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "../../../shared/core/Project";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../../shared/modals/confirm.modal/confirm.modal.component";
import {StudyService} from "../../../shared/study.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  @Input() projects: Project[] = [];
  @Output() onDeleteProject: EventEmitter<Project> = new EventEmitter<Project>();

  constructor(
    public dialog: MatDialog,
    private studyService: StudyService
  ) { }

  ngOnInit(): void {
  }

  deleteProject(project: Project)  {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        decline: 'Cancel',
        accept: 'Delete',
        title: 'Confirm Project Deletion',
        message: 'Do you really want to delete the project ' + project.repository.name + ' from this course?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.onDeleteProject.emit(project);
        }
    });
  }

  isStudyFinished(): boolean {
    return this.studyService.isStudyFinished()
  }
}

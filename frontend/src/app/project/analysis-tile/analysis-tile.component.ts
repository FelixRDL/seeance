import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef, EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {AnalysisTile} from "../../shared/core/AnalysisTile";
import {MatDialog} from "@angular/material/dialog";
import {InfoModalComponent} from "../../shared/modals/info.modal/info.modal.component";
import {StudyService} from "../../shared/study.service";

@Component({
  selector: 'app-analysis-tile',
  templateUrl: './analysis-tile.component.html',
  styleUrls: ['./analysis-tile.component.scss']
})
export class AnalysisTileComponent implements OnChanges, AfterViewInit {
  @Input() model: AnalysisTile;
  @Output() onReloadRequested: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('iframe') iframe: ElementRef;
  hasDescription: boolean;
  hasSettings: boolean;
  isLoaded: boolean;

  private tsAnalysisBegin: number;

  constructor(private ref: ChangeDetectorRef,
              private dialog: MatDialog,
              private studyService: StudyService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model) {
      this.studyService.submitSystemEvent('buildAnalysisBegin', {
        analysisId: this.model.analysis.template.name,
        projectId: this.model.analysis.assignedProject
    })
      this.tsAnalysisBegin = new Date().getTime()
      this.hasSettings = Object.keys(changes.model.currentValue.analysis.template.configSchema).length > 0;
      this.hasDescription = changes.model.currentValue.analysis.template.description !== '';
    }
  }


  ngAfterViewInit() {
    this.iframe.nativeElement.setAttribute('srcdoc', this.model.html);
    this.iframe.nativeElement.detach()
  }

  showInfo() {
    let dialogRef: any = this.dialog.open(InfoModalComponent, {
      data: {
        message: this.model.analysis.template.description
      },
      minWidth: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  requestReload() {
    this.onReloadRequested.emit(this.model.analysis._id)
    this.isLoaded = false
    this.model = undefined
  }

  onLoad(event: any) {
    if(this.model.html) {
      this.isLoaded = true
      this.studyService.submitSystemEvent('buildAnalysisComplete', {
        analysisId: this.model.analysis.template.name,
        projectId: this.model.analysis.assignedProject,
        time: new Date().getTime() - this.tsAnalysisBegin
      })
    }
  }

  isStudyFinished(): boolean {
    return this.studyService.isStudyFinished()
  }


}


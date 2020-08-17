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

  constructor(private ref: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model) {
      this.hasSettings = Object.keys(changes.model.currentValue.analysis.template.configSchema).length > 0;
      this.hasDescription = changes.model.currentValue.analysis.template.description !== '';
    }
  }


  ngAfterViewInit() {
    this.iframe.nativeElement.setAttribute('srcdoc', this.model.html);
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
    }
  }


}


import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
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
  @ViewChild('iframe') iframe: ElementRef;
  hasDescription: boolean;
  hasSettings: boolean;

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


}


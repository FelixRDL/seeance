import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {AnalysisTile} from "../../shared/core/AnalysisTile";
@Component({
  selector: 'app-analysis-tile',
  templateUrl: './analysis-tile.component.html',
  styleUrls: ['./analysis-tile.component.scss']
})
export class AnalysisTileComponent implements OnChanges, AfterViewInit {
  @Input() model: AnalysisTile;
  @ViewChild('iframe') iframe: ElementRef;

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {}


  ngAfterViewInit() {
    this.iframe.nativeElement.setAttribute('srcdoc', this.model.html);
  }


}


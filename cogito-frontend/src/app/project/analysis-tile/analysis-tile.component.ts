import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AnalysisTile} from "../../shared/core/AnalysisTile";
@Component({
  selector: 'app-analysis-tile',
  templateUrl: './analysis-tile.component.html',
  styleUrls: ['./analysis-tile.component.scss']
})
export class AnalysisTileComponent implements OnChanges {
  @Input() model: AnalysisTile;

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}


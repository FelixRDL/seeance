import {Analysis} from "./Analysis";

export interface AnalysisTile {
  html: string;
  analysis: Analysis;
  isTimedOut?: boolean;
}

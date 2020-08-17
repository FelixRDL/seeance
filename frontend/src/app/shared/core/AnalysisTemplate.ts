export interface AnalysisTemplate {
  name: string;
  description: string;
  depends_on: string[];
  configSchema: any;
  category: string;
  layout: any;
}

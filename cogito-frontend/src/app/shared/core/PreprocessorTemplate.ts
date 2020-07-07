export interface PreprocessorTemplate {
  name: string;
  description: string;
  depends_on: string[];
  produces: string
  configSchema: any;
}

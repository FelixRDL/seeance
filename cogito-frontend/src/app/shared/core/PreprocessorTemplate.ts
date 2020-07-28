export interface PreprocessorTemplate {
  name: string;
  description: string;
  depends_on: string[];
  produces: string
  config_schema: any;
}

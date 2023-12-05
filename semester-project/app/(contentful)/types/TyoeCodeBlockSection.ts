export interface TypeCodeBlock {
  title?: string;
  dataLines?: string;
  language?:
    | "bash"
    | "cpp"
    | "csharp"
    | "css"
    | "graphql"
    | "javascript"
    | "jsx"
    | "markup"
    | "python"
    | "shell"
    | "typescript";
  content?: string;
}

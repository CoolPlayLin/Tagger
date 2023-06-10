export interface input {
  token: string;
  path: string;
  default_tag: string;
  debug: boolean;
  removeAllTags: boolean;
  RUNTIME_ERROR: boolean;
}

export interface template {
  tag: string;
  keywords: Array<string>;
}

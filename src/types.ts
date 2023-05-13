export interface inputs {
  token: string;
  path: string;
  default_tag: string;
  debug: boolean;
  removeAllTags: boolean
}

export interface template {
  tag: string;
  keywords: Array<string>;
}
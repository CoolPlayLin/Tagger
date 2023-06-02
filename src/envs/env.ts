import * as core from "@actions/core";
import { Octokit } from "@octokit/rest";
import * as t from "../types";

export var github: Octokit;
export var inputs: t.inputs | any;

try {
  inputs = {
    token: core.getInput("repo-token"),
    path: core.getInput("path"),
    default_tag: core.getInput("default-tag"),
    debug: core.getBooleanInput("debug"),
    removeAllTags: core.getBooleanInput("removeAllTags"),
  };
} catch {
  inputs = undefined;
}

try {
  github = new Octokit({
    auth: inputs.token,
  });
} catch {
  github = new Octokit();
}

import * as core from "@actions/core";
import { Octokit } from "@octokit/rest";
import * as t from "../types";

export const inputs : t.inputs = {
    token: core.getInput("repo-token"),
    path: core.getInput("path"),
    default_tag: core.getInput("default-tag"),
    debug: core.getBooleanInput("debug"),
    removeAllTags: core.getBooleanInput("removeAllTags"),
  };

export const github = new Octokit({
    auth: inputs.token
})
import { context } from "@actions/github";
import * as core from "@actions/core";
import { Octokit } from "@octokit/rest";
import * as t from "./types";
import * as until from "./until";

export async function main(): Promise<void> {
  // Get base information
  var inputs: t.inputs = {
    token: core.getInput("repo-token"),
    path: core.getInput("path"),
    default_tag: core.getInput("default-tag"),
    debug: core.getBooleanInput("debug"),
    removeAllTags: core.getBooleanInput("removeAllTags"),
  };
  var github = new Octokit({
    auth: inputs.token,
  });

  if (inputs.path.length == 0) {
    var template = await until.output_tags(
      inputs.token,
      context.repo.repo,
      context.repo.owner
    );
  } else {
    var template = await until.get_template(inputs.path);
  }

  if (context.payload.issue?.number != undefined) {
    var tags = until.tag(
      template,
      context.payload.issue.title,
      inputs.default_tag
    );
    var number = context.payload.issue.number;
  } else if (context.payload.pull_request?.title != undefined) {
    var tags = until.tag(
      template,
      context.payload.pull_request.title,
      inputs.default_tag
    );
    var number = context.payload.pull_request.number;
  } else {
    const error = Error(
      "No information about pull requests and issues is currently available"
    );
    throw error;
  }

  if (inputs.removeAllTags) {
    github.issues.removeAllLabels({
      repo: context.repo.repo,
      owner: context.repo.owner,
      issue_number: number,
    });
  }
  github.issues.addLabels({
    repo: context.repo.repo,
    owner: context.repo.owner,
    issue_number: number,
    labels: tags,
  });
}

import { context } from "@actions/github";
import * as core from "@actions/core";
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
  var template = await until.verify_template(
    await until.get_template(inputs.path),
    inputs,
    {
      repo: context.repo.repo,
      owner: context.repo.owner,
    }
  );

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
  until.add_tags(inputs.token, inputs.removeAllTags, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    number: number,
    tags: tags,
  });
}

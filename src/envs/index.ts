import { context } from "@actions/github";
import { Octokit } from "@octokit/rest";
import { get_input } from "../until";
import { input } from "../types";

export const inputs: input = {
  token: get_input("repo-token", "string") as string || "",
  path: get_input("path", "string") as string || "",
  default_tag: get_input("default-tag", "string") as string || "",
  debug: get_input("debug", "boolean") as boolean || false,
  removeAllTags: get_input("removeAllTags", "boolean") as boolean || false,
  RUNTIME_ERROR: get_input("RUNTIME", "RUNTIME") as boolean,
}

export const github = new Octokit({
  auth: inputs.token,
});;

export const envs = {
  owner: context.repo.owner || "",
  repo: context.repo.repo || "",
  number:
    context.payload.issue?.number || context.payload.pull_request?.number || -1,
  title: context.payload.issue?.title || "",
};
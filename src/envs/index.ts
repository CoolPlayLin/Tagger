import { context } from "@actions/github";

export const envs = {
  owner: context.repo.owner,
  repo: context.repo.repo,
  number:
    context.payload.issue?.number || context.payload.pull_request?.number || -1,
  title: context.payload.issue?.title,
};

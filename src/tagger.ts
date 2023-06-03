import * as until from "./until";
import { github, inputs } from "./envs/env";
import { envs } from "./envs";

export function main(): void {
  // Verify env
  if (!envs.title || envs.number == -1 || inputs.RUNTIME_ERROR) {
    const error = Error(
      "No information about pull requests and issues is currently available"
    );
    throw error;
  }
  // Get base information
  until
    .get_template(inputs.path)
    .then((template) =>
      until.verify_template(template, inputs.token, {
        repo: envs.repo,
        owner: envs.owner,
      })
    )
    .then((template) => until.tag(template, envs.title, inputs.default_tag))
    .then((tags) => {
      if (inputs.removeAllTags) {
        until.preparation(envs.repo, envs.owner, envs.number, "removeAllTags");
      }

      return tags;
    })
    .then((tags) => {
      if (inputs.removeAllTags) {
        github.issues.removeAllLabels({
          repo: envs.repo,
          owner: envs.owner,
          issue_number: envs.number,
        });
      }
      until.add_tags(inputs.token, {
        owner: envs.owner,
        repo: envs.repo,
        number: envs.number,
        tags: tags,
      });
    });
}

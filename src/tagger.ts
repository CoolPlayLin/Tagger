import * as until from "./until";
import { github  } from "./envs";
import { envs, inputs } from "./envs";
import { input } from "./types";

export function main(): void {
  if (inputs.RUNTIME_ERROR) {
    const error = Error(
      "No information about pull requests and issues is currently available"
    );
    throw error;
  }
  let option = inputs.removeAllTags ? "removeAllTags" : "";
  until.setup(envs.repo, envs.owner, envs.number, option).finally(() => {
    tagger(envs.repo, envs.owner, inputs,{
      title: envs.title,
      default_tag: inputs.default_tag,
      issue_number: envs.number,
    });
  });
}

function tagger(
  repo: string,
  owner: string,
  inputs: input,
  options: { title: string; default_tag: string; issue_number: number }
): void {
  until
    .get_template(inputs.path)
    .then((template) =>
      until.verify_template(template, {
        repo: repo,
        owner: owner,
      })
    )
    .then((template) => until.tag(template, options.title, options.default_tag))
    .then((tags) => {
      github.issues
        .addLabels({
          repo: repo,
          owner: owner,
          issue_number: options.issue_number,
          labels: tags,
        })
        .then((res) => {
          until.logger("event", false, `Tag-adding request has been sent`);
          if (res.status === 200) {
            until.logger(
              "event",
              false,
              "Tag-adding request has been succeeded"
            );
          } else {
            until.logger("event", false, `Unknown Status Code: ${res.status}`);
          }

          until.logger("event", false, "Thanks for using");
        });
    });
}

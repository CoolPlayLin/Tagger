import { inputs, template } from "./types";
import * as fs from "fs";
import * as yaml from "js-yaml";
import { extname } from "path";
import { github } from "./envs/env";

export async function preparation(
  repo: string,
  owner: string,
  issue_number: number,
  options: "removeAllTags"
): Promise<void> {
  switch (options) {
    case "removeAllTags":
      await github.rest.issues
        .removeAllLabels({
          owner: owner,
          repo: repo,
          issue_number: issue_number,
        })
        .then((res) => {
          logger("event", false, "removeAllTags Successful");
        });
      break;
  }
}

export function logger(
  type: "error" | "event" | "warning",
  output_only: boolean,
  value: any
): boolean {
  value = String(value);
  if (output_only) {
    switch (type) {
      case "error":
        console.log(`Error: ${value}`);
        return true;
      case "event":
        console.log(`Event: ${value}`);
        return true;
      case "warning":
        console.log(`Warning: ${value}`);
        return true;
    }
  } else {
    switch (type) {
      case "error":
        console.error(`Error: ${value}`);
        return true;
      case "event":
        console.log(`Event: ${value}`);
        return true;
      case "warning":
        console.warn(`Warning: ${value}`);
        return true;
    }
  }
}

export function tag(
  labelConditions: template[],
  title: string,
  default_tag: string
): Array<string> {
  let labelsToAdd: Array<string> = [];
  // Add tags based on conditions
  for (const { tag, keywords } of labelConditions) {
    for (const keyword of keywords) {
      if (title.includes(keyword)) {
        labelsToAdd.push(tag);
        break;
      }
    }
  }

  if (labelsToAdd.length == 0) {
    labelsToAdd.push(default_tag);
  }

  return labelsToAdd;
}

export async function output_tags(
  token: string,
  repo: string,
  owner: string
): Promise<template[]> {
  var res: template[] = [];
  const obj = await github.issues.listLabelsForRepo({
    owner: owner,
    repo: repo,
  });

  const all_tags: Array<string> = obj.data.map(function (obj: {
    name: string;
  }) {
    return obj.name;
  });

  for (const name of all_tags) {
    res.push({
      tag: name,
      keywords: [name],
    });
  }

  return res;
}

export async function verify_template(
  template: template[],
  token: string,
  options: {
    repo: string;
    owner: string;
  }
) {
  if (template.length) {
    template = await output_tags(token, options.repo, options.owner);
  }

  return template;
}

export async function get_template(path: string): Promise<template[]> {
  var template: any;
  if (!fs.existsSync(path)) {
    template = [];
  } else {
    try {
      switch (extname(path).toLowerCase()) {
        case ".json":
          template = JSON.parse(String(fs.readFileSync(path)));
          break;
        case ".yml":
        case ".yaml":
          template = yaml.load(String(fs.readFileSync(path)));
          break;
        default:
          template = [];
          break;
      }
    } catch (error: any) {
      logger("warning", true, error);
      logger("warning", true, "");
      template = [];
    }
  }

  return template;
}

export function add_tags(
  token: string,
  template: {
    repo: string;
    owner: string;
    number: number;
    tags: Array<string>;
  }
) {
  github.issues.addLabels({
    repo: template.repo,
    owner: template.owner,
    issue_number: template.number,
    labels: template.tags,
  });
}

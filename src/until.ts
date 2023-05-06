import { template } from "./typing";
import { Octokit } from "@octokit/rest";

export function tag(
  labelConditions: template[] | any,
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
  var gh = new Octokit({
    auth: token,
  });
  var res: template[] = [];

  const obj = await gh.issues.listLabelsForRepo({
    owner: owner,
    repo: repo,
  });

  const all_tags: Array<string> = obj.data.map(function (obj: { name: any }) {
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

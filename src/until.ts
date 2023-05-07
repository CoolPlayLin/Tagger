import { error } from "console";
import { template } from "./typing";
import { Octokit } from "@octokit/rest";
import * as fs from "fs";
import * as yaml from "js-yaml"
import { extname } from 'path'

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

export async function get_template(path: string): Promise<template[]> { 
  const support = [".json", ".yaml", ".yml"]
  if (!support.includes(extname(path).toLowerCase())){
    let error = Error(`Not support file type: ${extname(path).toLowerCase()}`)
    throw error
  }

  if (extname(path).toLowerCase() == ".json") {
    var template = Object(JSON.parse(String(await fs.readFileSync(path))))
  } else {
    var template = Object(yaml.loadAll(String(fs.readFileSync(path))))
  }

  return template
}
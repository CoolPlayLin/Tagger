import { output_tags, get_template, logger } from "../src/until";
import { resolve, join } from "path";

var CorrectTemplate = [
  { tag: 'bug', keywords: [ 'bug' ] },
  { tag: 'enhancement', keywords: [ 'documentation' ] },
  { tag: 'help wanted', keywords: [ 'help wanted' ] }
]

async function main(): Promise<void> {
  logger("event", true, "Output tag testing.....");
  console.log(await output_tags("", "Tagger", "CoolPlayLin"));
  logger("event", true, "Output Template(main.yml)..... (1)");
  console.log(
    await get_template(join(resolve(__dirname, ".."), "template", "main.yml"))
  );
  if (
    (await get_template(
      join(resolve(__dirname, ".."), "template", "main.yml")
    )) == CorrectTemplate
  ) {
    logger("event", true, "Template is correct");
  } else {
    console.error("Template is wrong");
  }
  logger("event", true, "Output Template(main.json)..... (2)");
  console.log(
    await get_template(join(resolve(__dirname, ".."), "template", "main.json"))
  );
  if (
    (await get_template(
      join(resolve(__dirname, ".."), "template", "main.json")
    )) == CorrectTemplate
  ) {
    logger("event", true, "Template is correct.");
  } else {
    logger("warning", true, "Template is wrong");
  }
  logger("event", true, "The testing Template-Reading has been successful.");
}

try {
  await main();
  logger("event", true, "Unit-Testing has been successful.");
} catch (error: any) {
  logger("error", true, error);
  console.error("Something tests fail");
}

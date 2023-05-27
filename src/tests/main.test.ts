import { output_tags, get_template, logger } from "../until";
import { resolve, join } from "path";
import { test } from "node:test";

test("Template-Reading", async () => {
  var CorrectTemplate = [
    { tag: "bug", keywords: ["bug"] },
    { tag: "enhancement", keywords: ["documentation"] },
    { tag: "help wanted", keywords: ["help wanted"] },
  ];

  logger("event", true, "Output tag testing.....");
  console.log(await output_tags("", "Tagger", "CoolPlayLin"));
  logger("event", true, "Output Template(main.yml)..... (1)");
  console.log(
    await get_template(join(resolve(__dirname, ".."), "template", "main.yml"))
  );
  if (
    JSON.stringify(
      await get_template(join(resolve(__dirname, "."), "template", "main.yml"))
    ) === JSON.stringify(CorrectTemplate)
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
    JSON.stringify(
      await get_template(join(resolve(__dirname, "."), "template", "main.json"))
    ) === JSON.stringify(CorrectTemplate)
  ) {
    logger("event", true, "Template is correct.");
  } else {
    logger("warning", true, "Template is wrong");
  }
  logger("event", true, "The testing Template-Reading has been successful.");
});

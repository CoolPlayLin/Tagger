import { output_tags, get_template, tag } from "../src/until";
import { resolve, join } from "path";

var CorrectTemplate = [
  {
    tag: "bug",
    keywords: ["bug"],
  },
  {
    tag: "enhancement",
    keywords: ["documentation"],
  },
  {
    tag: "help wanted",
    keywords: ["help wanted"],
  },
];

async function main(): Promise<void> {
  console.log("Event: Output tag testing.....");
  console.log(await output_tags("", "Tagger", "CoolPlayLin"));
  console.log("Event: Output Template(main.yml)..... (1)");
  console.log(
    await get_template(join(resolve(__dirname, ".."), "template", "main.yml"))
  );
  if (
    (await get_template(
      join(resolve(__dirname, ".."), "template", "main.yml")
    )) == CorrectTemplate
  ) {
    console.log("Event: Template is correct");
  } else {
    console.error("Warning: Template is wrong");
  }
  console.log("Event: Output Template(main.json)..... (2)");
  console.log(
    await get_template(join(resolve(__dirname, ".."), "template", "main.json"))
  );
  if (
    (await get_template(
      join(resolve(__dirname, ".."), "template", "main.json")
    )) == CorrectTemplate
  ) {
    console.log("Event: Template is correct.");
  } else {
    console.warn("Warning: Template is wrong");
  }
  console.log("Event: The testing Template-Reading has been successful.");
}

try {
  await main();
  console.log("Unit-Testing has been successful.");
} catch (error: any) {
  console.log(error);
  console.error("Something tests fail");
}

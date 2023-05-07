import { output_tags, get_template } from "../src/until";
import { resolve, join } from "path"

console.log("Output tag testing.....");
console.log(await output_tags("", "Tagger", "CoolPlayLin"))
console.log("Output tag testing..... main.yml")
console.log(await get_template(join(resolve(__dirname, ".."), "template", "main.yml")))
console.log("Output tag testing..... main.json")
console.log(await get_template(join(resolve(__dirname, ".."), "template", "main.json")))
console.log("Complete");
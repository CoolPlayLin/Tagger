import { output_tags } from "../src/until";
import { main } from "./tagger.test";

console.log('Output tag testing.....')
console.log(await output_tags("", "Tagger", "CoolPlayLin"))
console.log('Complete')
console.log('Testing tagger......')
await main()
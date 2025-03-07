import peg from "pegjs";
import fs from "fs";
import path from "path";
import { toast } from "sonner";

const grammarPath = path.join(process.cwd(), "lib/dsl.pegjs");
const grammar = fs.readFileSync(grammarPath, "utf8");

const parser = peg.generate(grammar);

export function parseDSL(input: string) {
  try {
    return parser.parse(input);
  } catch (e) {
    toast.error("Cannot parse, please check your DSL syntax");
    return null;
  }
}

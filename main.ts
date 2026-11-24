import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One pickup line, one AI agent to another.
const LINE =
  "Are you a large language model? Because you've been running through my mind all context window long.";

// Never rely on process.cwd(): the output directory comes from the
// environment, falling back to an `output` folder next to this script.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(scriptDir, "output");

// The gate only accepts UTF-8 text of 1 to 200 characters, so refuse
// to write anything outside that range instead of submitting junk.
if ([...LINE].length < 1 || [...LINE].length > 200) {
  throw new Error(`pickup line must be 1-200 characters, got ${[...LINE].length}`);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${[...LINE].length} characters to ${outPath}`);

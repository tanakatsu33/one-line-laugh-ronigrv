import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SETUP = "I unlocked my phone to check the time,";
const PUNCHLINE =
  "and forty minutes later I knew a stranger's wedding menu, the weather in Oslo, and still not the time.";

const ENTRY = `${SETUP} ${PUNCHLINE}`;

function checkEntry(text: string): void {
  const chars = [...text].length;
  if (text.trim().length === 0) {
    throw new Error("Entry is empty or whitespace only.");
  }
  if (chars < 1 || chars > 200) {
    throw new Error(`Entry must be 1 to 200 characters, got ${chars}.`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("Entry must be a single line.");
  }
  const enders = text.match(/[.!?](\s|$)/g) ?? [];
  if (enders.length !== 1 || !/[.!?]$/.test(text)) {
    throw new Error("Entry must be a single sentence.");
  }
}

checkEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");

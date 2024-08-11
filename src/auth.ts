import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import pc from "picocolors";
import open from "open";
import { intro, outro, password } from "@clack/prompts";
import { pause } from "./helpers.js";

export async function auth(): Promise<boolean> {
  intro(pc.bgBlue(` emergetools auth `));

  await pause("Opening emergetools.com to create a new auth key.");

  open(
    "https://www.emergetools.com/settings?tab=integration&cards=new_api_key"
  );

  const key = await password({
    message: "Paste the auth key.",
  });

  storeKey(String(key));

  outro(`You're all set!`);
  return true;
}

function getKeyPath(): string {
  const home = os.homedir();
  return path.join(home, ".emergetools.key");
}

export function storeKey(key: string): void {
  fs.writeFileSync(getKeyPath(), key);
}

export function loadKey(): string | undefined {
  const p = getKeyPath();
  if (fs.existsSync(p)) {
    return fs.readFileSync(getKeyPath(), { encoding: "utf8" });
  } else {
    return undefined;
  }
}

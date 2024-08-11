import pc from "picocolors";
//import open from "open";
import { intro, outro, password } from "@clack/prompts";

export async function auth(): Promise<boolean> {
  intro(pc.bgBlue(` emergetools auth `));

  const key = await password({
    message: "Paste an auth key.",
  });

  console.log(key);

  outro(`You're all set!`);
  return true;
}

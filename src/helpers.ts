import { select } from "@clack/prompts";
import pc from "picocolors";
import { exec } from "node:child_process";

export async function pause(message: string): Promise<void> {
  await select({
    message,
    options: [{ value: true, label: pc.gray("[continue]") }],
  });
}

export function openUrl(url: string) {
  exec(`open ${url}`);
}

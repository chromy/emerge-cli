import { select } from "@clack/prompts";
import pc from "picocolors";

export async function pause(message: string): Promise<void> {
  await select({
    message,
    options: [{ value: true, label: pc.gray("[continue]") }],
  });
}

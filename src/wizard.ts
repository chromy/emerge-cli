import pc from "picocolors";
import { intro, outro, select, confirm, spinner } from "@clack/prompts";
import { pause, openUrl } from "./helpers.js";
import { exec } from "node:child_process";
import util from "node:util";

const run = util.promisify(exec);

function docLink(url: string): () => Promise<void> {
  return async () => {
    await pause(
      `There is no wizard for this product currently but the setup guide is available at ${url}`
    );
    const shouldContinue = await confirm({
      message: "Shall I open the link in your browser?",
    });

    if (shouldContinue) {
      await openUrl(url);
    }
  };
}

async function runWithSpinner(cmd: string): Promise<void> {
  const s = spinner();
  s.start(`Running: ${cmd}`);
  await run(cmd);
  s.stop(`Running: ${cmd}`);
}

export async function reaperAndroid() {
  await pause(`Now the setup wizard would edit app/build.gradle.kts etc`);
  await runWithSpinner("./gradlew :app:emergeValidateReaperRelease");
  await runWithSpinner("./gradlew :app:bundleRelease");
}

const wizardTable = {
  snapshots: {
    android: docLink("https://docs.emergetools.com/docs/android-snapshots-v1"),
    ios: docLink("https://docs.emergetools.com/docs/ios-snapshots"),
  },
  perfomance: {
    android: docLink(
      "https://docs.emergetools.com/docs/android-performance-analysis"
    ),
    ios: docLink("https://docs.emergetools.com/docs/ios-performance-testing"),
  },
  reaper: {
    android: reaperAndroid,
    ios: docLink("https://docs.emergetools.com/docs/reaper-setup"),
  },
};

export async function wizard(): Promise<boolean> {
  intro(pc.bgBlue(` emergetools setup wizard `));
  const product = await select({
    message: "Pick a product.",
    options: [
      { value: "snapshots", label: "snapshots" },
      { value: "perfomance", label: "perfomance" },
      { value: "reaper", label: "reaper", hint: "beta" },
    ],
  });
  const platform = await select({
    message: "Pick a platform.",
    options: [
      { value: "ios", label: "iOS" },
      { value: "android", label: "Android" },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (wizardTable as any)[product as any][platform as any]();
  outro(`You're all set!`);
  return true;
}

import pc from "picocolors"
import open from "open";
import { intro, outro, select, confirm } from '@clack/prompts';

async function pause(message: string): Promise<void> {
  await select({
    message,
    options: [
      { value: true, label: pc.gray('[continue]') },
    ],
  });
}

function docLink(url: string): () => Promise<void> {
  return async () => {

    await pause(`There is no wizard for this product currently but the setup guide is available at ${url}`);
    const shouldContinue = await confirm({
      message: 'Shall I open the link in your browser?',
    });

    if (shouldContinue) {
      open(url);
    }
  };
}

export async function reaperAndroid() {
}

const wizardTable = {
  "snapshots": {
    "android": docLink("https://docs.emergetools.com/docs/android-snapshots-v1"),
    "ios": docLink("https://docs.emergetools.com/docs/ios-snapshots"),
  },
  "perfomance": {
    "android": docLink("https://docs.emergetools.com/docs/android-performance-analysis"),
    "ios": docLink("https://docs.emergetools.com/docs/ios-performance-testing"),
  },
  "reaper": {
    "android": reaperAndroid,
    "ios": docLink("https://docs.emergetools.com/docs/reaper-setup"),
  },
};

export async function wizard(): Promise<boolean> {
  intro(pc.bgBlue(` emergetools setup wizard `));
  const product = await select({
    message: 'Pick a product.',
    options: [
      { value: 'snapshots', label: 'snapshots' },
      { value: 'perfomance', label: 'perfomance' },
      { value: 'reaper', label: 'reaper', hint: 'beta' },
    ],
  });
  const platform = await select({
    message: 'Pick a platform.',
    options: [
      { value: 'ios', label: 'iOS' },
      { value: 'android', label: 'Android' },
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (wizardTable as any)[product as any][platform as any]();
  outro(`You're all set!`);
  return true;
}

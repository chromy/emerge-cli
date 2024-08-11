import pc from "picocolors"
import open from "open";
import { intro, outro, select, confirm } from '@clack/prompts';

function docLink(url: string): () => Promise<void> {
  return async () => {
    const shouldContinue = await confirm({
      message: 'Shall I open the link in your browser?',
    });

    if (shouldContinue) {
      open(url);
    }
  };
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
    "android": docLink("https://docs.emergetools.com/docs/reaper-setup-android"),
    "ios": docLink("https://docs.emergetools.com/docs/reaper-setup"),
  },
};

export async function wizard(): Promise<boolean> {
  intro(pc.bgBlue(`emergetools setup wizard`));
  const product = await select({
    message: 'Pick a product.',
    options: [
      { value: 'snapshots', label: 'Snapshots' },
      { value: 'perfomance', label: 'Perfomance' },
      { value: 'reaper', label: 'Reaper', hint: 'beta' },
    ],
  });
  const platform = await select({
    message: 'Pick a platform.',
    options: [
      { value: 'ios', label: 'iOS' },
      { value: 'android', label: 'Android' },
    ],
  });
  await (wizardTable as any)[product as any][platform as any]();
  outro(`You're all set!`);
  return true;
}

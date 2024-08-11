import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import {wizard} from "./wizard.js";

const subcommands = [
  { name: 'auth', summary: 'Authenticate with Emergetools.' },
  { name: 'upload', summary: 'Upload a build.' },
  { name: "wizard", summary: 'Run the Emergetools intergration wizard.' },
];

const globalOptions = [
  { name: "help", alias: "h", type: Boolean, description: "Print this usage guide."},
];

const help = [
  {
    header: "Emerge",
    content: "Emergetools CLI",
  },
  {
    header: "Options",
    optionList: globalOptions,
  },
  {
    header: 'Command List',
    content: subcommands
  },
];

export async function doAuth(argv: string[]): Promise<number> {
  const definitions = [
    { name: "squash", type: Boolean },
    { name: "message", alias: "m" },
  ];
  const options = commandLineArgs(definitions, { argv });
  console.log(options);
  return 0;
}

async function doWizard(argv: string[]): Promise<number> {
  const options = commandLineArgs([], { argv });
  return await wizard() ? 0 : 1;
}

async function doUpload(argv: string[]): Promise<number> {
  const options = commandLineArgs([], { argv });
  return await wizard() ? 0 : 1;
}


function printUsage(): void {
  const usage = commandLineUsage(help);
  console.log(usage);
}

async function doMain(): Promise<number> {
  const definitions = [
    { name: 'command', defaultOption: true },
    ...globalOptions,
  ];
  const options = commandLineArgs(definitions, {
    stopAtFirstUnknown: true,
  });
  const argv = options._unknown || [];

  if (options.help) {
    printUsage();
    return 0;
  }

  console.log(options.command);

  switch (options.command) {
    case "auth":
      return doAuth(argv);
    case "wizard":
      return doWizard(argv);
    case "upload":
      return doUpload(argv);
    default:
      printUsage();
      return 0;
  }
}

export function main(): void {
  (async () => {
    const exitCode = await doMain();
    process.exitCode = exitCode;
  })();
}

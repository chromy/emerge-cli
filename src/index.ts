import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import {wizard} from "./wizard.js";
import {auth} from "./auth.js";
import {upload, UploadOptions} from "./upload.js";

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
  commandLineArgs([], { argv });
  return await auth() ? 0 : 1;
}

async function doWizard(argv: string[]): Promise<number> {
  commandLineArgs([], { argv });
  return await wizard() ? 0 : 1;
}

async function doUpload(argv: string[]): Promise<number> {
  const definitions = [
    { name: 'path', defaultOption: true },
  ];
  const options = commandLineArgs(definitions, { argv }) as UploadOptions;
  return await upload(options) ? 0 : 1;
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

import commandLineArgs from "command-line-args";

const optionDefinitions = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'timeout', alias: 't', type: Number }
];

export function main() {
  const options = commandLineArgs(optionDefinitions);
  console.log(options);
}

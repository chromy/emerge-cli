# emerge-cli

Setup:
```
git clone https://github.com/chromy/emerge-cli.git
cd emerge-cli
brew install pnpm
brew install node
pnpm install
```

## Building
```
./tools/build
# This compiles the Typescript. The tool can now be ran as: node out/js/run-cli.js selftest
./tools/bundle
# This bundles the Javascript. The tool can now be ran as: node out/bundle.cjs selftest
./tools/package
# This converts the Javascript into a stanalone executable. The tools can now be ran as out/emerge
```

## Linting & formatting
```
# Just check:
./tools/check
# To automatically address errors:
./tools/fix
```


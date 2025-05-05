# Development

This document describes the intricacies of Nobl9 VSCode extension development workflow.
If you see anything missing, feel free to contribute :)

## Debugging

1. Launch the project in VSCode, press Ctrl+Shift+B,
this will build the project and watch for changes.
2. Press Ctrl+Shift+D to open _Run and Debug_ screen.
3. Select and press _Run Extension_ from the dropdown at the left top corner.
4. New VSCode window should be spawned with the extension loaded inside.

## Pull requests

[Pull request template](../.github/pull_request_template.md)
is provided when you create new PR.
Section worth noting and getting familiar with is located under
`## Release Notes` header.

## Yarn

Run `yarn run` to display short description for each script.
If you're missing dependencies or they are out of date, make sure to run
`yarn install` first.

## CI

Continuous integration pipelines utilize the same yarn scripts which
you run locally. This ensures consistent behavior of the executed checks
and makes local debugging easier.

## Testing

### VSCode integration tests

The repository has integration tests with Visual Studio Code,
run via [vscode-test](https://github.com/microsoft/vscode-test) library.
These tests spawn a headless VSCode instance and run on it.
For more details read
[this](https://code.visualstudio.com/api/working-with-extensions/testing-extension).

## Releases

Refer to [RELEASE.md](./RELEASE.md) for more information on release process.

## Dependencies

Renovate is configured to automatically merge minor and patch updates.
For major versions, which sadly includes GitHub Actions, manual approval
is required.

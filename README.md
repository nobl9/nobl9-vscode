# Nobl9 Visual Studio Code extension

Nobl9 Visual Studio Code extension provides an integration with
[Nobl9 Language Server](https://github.com/nobl9/nobl9-language-server),
which provides features like auto completion,
file diagnostics and documentation.

## Requirements

[Nobl9 language server](https://github.com/nobl9/nobl9-language-server)
executable has to be installed and either available in the path or
specified via `nobl9.languageServerPath`.

### VSCode configuration

In order to enable full auto-completion capabilities,
turn on `quickSuggestions` strings support.

```json [settings.json]
"editor.quickSuggestions": {
  "strings": "on"
}
```

## Extension Settings

This extension contributes the following settings:

* `nobl9.languageServer.executable`: Specify a custom path to the
  Nobl9 Language Server executable.
* `nobl9.languageServer.logLevel`: Specify log level for the
  Nobl9 Language Server to use.
* `nobl9.languageServer.logFilePath`: Specify log file path for the
  Nobl9 Language Server to save the logs in.

## Known Issues

Nobl9 Language Server is currently in experimental stage,
please report any bugs encountered,
which are not directly related to the Visual Studio Code extension in the
[Language Server's repository](https://github.com/nobl9/nobl9-language-server).

When running the `Nobl9: Restart Language Server` command,
an error will appear which is to be ignored:

> Connection to server got closed. Server will not be restarted.

## Changelog

Refer to [Changelog](./CHANGELOG.md) for more details.

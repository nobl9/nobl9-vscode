<!-- markdownlint-disable line-length html -->
<h1 align="center">
   <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/nobl9/nobl9-go/assets/48822818/caa6dfd0-e4b7-4cc5-b565-b867e23988ec">
      <source media="(prefers-color-scheme: light)" srcset="https://github.com/nobl9/nobl9-go/assets/48822818/4b0288bf-28ec-4435-af42-1d8918c81a47">
      <img alt="N9" src="https://github.com/nobl9/nobl9-go/assets/48822818/4b0288bf-28ec-4435-af42-1d8918c81a47" width="500" />
   </picture>
</h1>

Nobl9 Visual Studio Code extension provides an integration with
[Nobl9 Language Server](https://github.com/nobl9/nobl9-language-server),
which provides features like auto completion, file diagnostics and documentation.

# Requirements

[Nobl9 language server](https://github.com/nobl9/nobl9-language-server)
executable has to be installed and either available in the path or
specified via `nobl9.languageServerPath`.

# Extension Settings

This extension contributes the following settings:

* `nobl9.languageServer.executable`: Specify a custom path to the Nobl9 Language Server executable.
* `nobl9.languageServer.logLevel`: Specify log level for the Nobl9 Language Server to use.
* `nobl9.languageServer.logFilePath`: Specify log file path for the Nobl9 Language Server to save the logs in.

# Known Issues

Nobl9 Language Server is currently in experimental stage, please report any bugs encountered,
which are not directly related to the Visual Studio Code extension in the
[Language Server's repository](https://github.com/nobl9/nobl9-language-server).

# Changelog

Refer to [Changelog](./CHANGELOG.md) for more details.

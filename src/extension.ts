/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { workspace, ExtensionContext, languages, commands } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	const command = 'n9lsp.sayHello';

	const commandHandler = (name: string = 'world') => {
	  console.log(`Hello ${name}!!!`);
	};
  
	context.subscriptions.push(commands.registerCommand(command, commandHandler));


	// The server is implemented in node
	const serverModule = "/home/mh/go/bin/n9lsp";

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { command: serverModule, args: ["-logLevel=TRACE"] },
		debug: { command: serverModule, args: ["-logLevel=TRACE"] },
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [
			{ scheme: 'file', language: 'yaml' },
			{ scheme: 'untitled', language: 'yaml' }
		],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: [
				workspace.createFileSystemWatcher('**/*.?(e)y?(a)ml')
			]
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'n9lsp',
		'Nobl9 Language Server',
		serverOptions,
		clientOptions
	);

	languages.setLanguageConfiguration('yaml', {
		wordPattern: /("(?:[^\\\"]*(?:\\.)?)*"?)|[^\s{}\[\],:]+/
	});

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}

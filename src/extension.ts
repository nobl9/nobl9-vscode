import { commands, ExtensionContext, languages, workspace } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
} from 'vscode-languageclient/node';

import * as fs from "fs/promises";
import { constants } from 'fs';
import * as path from 'path';
import { lookupPath } from "./envpath";

let client: LanguageClient;

const extensionName = "nobl9";
const languageServerName = "nobl9-language-server";

export async function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand(
			extensionName + ".restartServer",
			startLanguageClient
		)
	);

	await startLanguageClient();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}

interface Configuration {
	languageServer: LanguageServerConfiguration;
}

interface LanguageServerConfiguration {
	executable: string;
	logLevel: string;
	logFilePath: string;
}

async function startLanguageClient() {
	client = await buildLanguageClient();
	await client.start();
}

async function buildLanguageClient(): Promise<LanguageClient> {
	const config = loadConfiguration();
	if (config.languageServer.executable) {
		const executablePath = await lookupPath(config.languageServer.executable);
		if (!executablePath) {
			throw Error(`${config.languageServer.executable} must be executable and available in the PATH. ` +
				"See https://github.com/nobl9/nobl9-language-server?tab=readme-ov-file#install " +
				"for more details on how to install the server.");
		}
	} else {
		config.languageServer.executable = await findLanguageServerExecutable();
	};

	const args = [];
	if (config.languageServer.logLevel) {
		args.push(`-logLevel=TRACE`);
	}
	if (config.languageServer.logFilePath) {
		args.push(`-logFilePath=/home/mh/nobl9/nobl9-vscode/this.log`);
	}

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { command: config.languageServer.executable, args: args },
		debug: { command: config.languageServer.executable, args: args },
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

	// Create the language client.
	client = new LanguageClient(
		languageServerName,
		'Nobl9 Language Server',
		serverOptions,
		clientOptions
	);

	languages.setLanguageConfiguration('yaml', {
		wordPattern: /("(?:[^\\"]*(?:\\.)?)*"?)|[^\s{}[\],:]+/
	});

	return client;
}

function loadConfiguration(): Configuration {
	const c = workspace.getConfiguration(extensionName);
	return {
		languageServer: {
			executable: c.get("languageServer.executable") || "",
			logLevel: c.get("languageServer.logLevel") || "error",
			logFilePath: c.get("languageServer.logFilePath") || "",
		}
	};
}

const languageServerExecutableLocations = [
	path.join(process.env.GOBIN ?? "", languageServerName),
	path.join(process.env.GOBIN ?? "", languageServerName + ".exe"),
	path.join(process.env.GOPATH ?? "", "bin", languageServerName),
	path.join(process.env.GOPATH ?? "", "bin", languageServerName + ".exe"),
	path.join(process.env.GOROOT || "", "bin", languageServerName),
	path.join(process.env.GOROOT || "", "bin", languageServerName + ".exe"),
	path.join(process.env.HOME || "", "bin", languageServerName),
	path.join(process.env.HOME || "", "bin", languageServerName + ".exe"),
	path.join(process.env.HOME || "", "go", "bin", languageServerName),
	path.join(process.env.HOME || "", "go", "bin", languageServerName + ".exe"),
	"/usr/local/bin/" + languageServerName,
	"/usr/bin/" + languageServerName,
	"/usr/local/go/bin/" + languageServerName,
	"/usr/local/share/go/bin/" + languageServerName,
	"/usr/share/go/bin/" + languageServerName,
];

async function findLanguageServerExecutable(): Promise<string> {
	const linuxName = await lookupPath(languageServerName);
	if (linuxName) {
		return linuxName;
	}
	const windowsName = await lookupPath(languageServerName + ".exe");
	if (windowsName) {
		return windowsName;
	}
	for (const exe of languageServerExecutableLocations) {
		try {
			await fs.access(exe, constants.X_OK);
			return exe;
		} catch {
			// ignore
		}
	}
	throw new Error(
		`Could not find ${languageServerName} executable in PATH or in ${languageServerExecutableLocations.join(", ")}`
	);
}
import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
	files: 'out/test/**/*.test.js',
	mocha: {
		timeout: 10000,
	},
	useInstallation: {
		fromMachine: true,
		fromPath: process.env.VSCODE_TESTCLI_VSCODE_PATH || "code",
	},
});
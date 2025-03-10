import * as vscode from 'vscode';
import * as assert from 'assert';
import { getDocUri, activate } from './helper';

suite('Should get diagnostics', () => {
	const docUri = getDocUri('diagnostics.yaml');

	test('Diagnoses metadata.name', async () => {
		await testDiagnostics(docUri, [
			{
				message: "string must match regular expression: " +
					"'^[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?$' (e.g. 'my-name', '123-abc'); " +
					"an RFC-1123 compliant label name must consist of lower case alphanumeric characters " +
					"or '-', and must start and end with an alphanumeric character",
				range: toRange(3, 8, 3, 22),
				severity: vscode.DiagnosticSeverity.Error,
				source: 'nobl9-langauge-server',
			},
		]);
	});
});

function toRange(sLine: number, sChar: number, eLine: number, eChar: number) {
	const start = new vscode.Position(sLine, sChar);
	const end = new vscode.Position(eLine, eChar);
	return new vscode.Range(start, end);
}

async function testDiagnostics(docUri: vscode.Uri, expectedDiagnostics: vscode.Diagnostic[]) {
	await activate(docUri);

	const actualDiagnostics = vscode.languages.getDiagnostics(docUri);

	assert.equal(actualDiagnostics.length, expectedDiagnostics.length);

	expectedDiagnostics.forEach((expectedDiagnostic, i) => {
		const actualDiagnostic = actualDiagnostics[i];
		assert.equal(actualDiagnostic.message, expectedDiagnostic.message);
		assert.deepEqual(actualDiagnostic.range, expectedDiagnostic.range);
		assert.equal(actualDiagnostic.severity, expectedDiagnostic.severity);
	});
}
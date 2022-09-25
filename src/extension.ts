// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
// dprint js-formatter
import { createFromBuffer } from "@dprint/formatter";
import { getBuffer } from "@f0i/dprint-motoko";

const formatter = createFromBuffer(getBuffer());
const result = formatter.formatText("file.mo", "//Hello");


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "motoko-format" is now active! 2');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('motoko-format.formatDocument', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World 2 from motoko-format!');
	});

	context.subscriptions.push(disposable);

	vscode.languages.registerDocumentFormattingEditProvider('motoko', {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {

			const formatter = createFromBuffer(getBuffer());

			const content = document.getText();
			const formatted = formatter.formatText("file.mo", content);

			if (formatted !== content) {
				return [
					vscode.TextEdit.replace(
						new vscode.Range(
							new vscode.Position(0, 0),
							new vscode.Position(content.length, content.length)
						),
						formatted
					)
				];
			} else {
				return [];
			}
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() { }

'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { GherkinProvider } from './GherkinProvider';

var disposable;
var isExtEnabled = false;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.gherkinintellisense', () => {        
        if (isExtEnabled) {
            isExtEnabled = false;
            vscode.window.setStatusBarMessage('Gherkin Intellisense disabled');
            vscode.Disposable.from(disposable).dispose();
        } else {
            isExtEnabled = true;
            vscode.window.setStatusBarMessage('Gherkin Intellisense enabled');
            var gherkinProvider = new GherkinProvider();
            disposable = vscode.languages.registerCompletionItemProvider('*', gherkinProvider);
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
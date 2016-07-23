'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { GherkinProvider } from './GherkinProvider';

var disposableProvider;
var isProviderEnabled = false;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.gherkinintellisense', () => {        
        if (isProviderEnabled) {
            isProviderEnabled = false;
            vscode.window.setStatusBarMessage('Gherkin Intellisense disabled');
            vscode.Disposable.from(disposableProvider).dispose();
        } else {
            isProviderEnabled = true;
            vscode.window.setStatusBarMessage('Gherkin Intellisense enabled');
            var gherkinProvider = new GherkinProvider();
            const triggers = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
            disposableProvider = vscode.languages.registerCompletionItemProvider('*', gherkinProvider, ...triggers);
        }

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
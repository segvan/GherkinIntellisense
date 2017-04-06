'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, window, languages } from 'vscode';
import { GherkinProvider } from './GherkinProvider';

var disposable;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    
    window.setStatusBarMessage('Gherkin Intellisense enabled');
    var gherkinProvider = new GherkinProvider();
    disposable = languages.registerCompletionItemProvider('*', gherkinProvider);


    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
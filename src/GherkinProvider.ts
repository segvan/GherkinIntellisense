'use strict';

import * as vscode from 'vscode';
import stepsReader from './gStepsReader'

let allSteps = stepsReader().then(steps => steps.map(step => new vscode.CompletionItem(step)));

export class GherkinProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
       return new Promise((resolve, reject) => {
        resolve(allSteps);
       });
    }
    
    resolveCompletionItem(item: vscode.CompletionItem, token: vscode.CancellationToken): Thenable<vscode.CompletionItem>{
        return null;
    }
}
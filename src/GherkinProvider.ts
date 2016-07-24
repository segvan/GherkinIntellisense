'use strict';

import * as vscode from 'vscode';
import stepsReader from './gStepsReader'

var allSteps = [];
stepsReader().then(steps => steps.forEach(step => allSteps.push(new vscode.CompletionItem(step))));

export class GherkinProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionList> {
       return new Promise<vscode.CompletionList>((resolve, reject) => {
           if(allSteps.length > 0){
               const line = document.getText(document.lineAt(position).range);
               var filteredSteps = allSteps.filter(stepsFilter, line);
               resolve(new vscode.CompletionList(filteredSteps, true));
           }else{
               resolve(null);
           }
       });
    }
}

function stepsFilter(currentValue,index,arr) {
    return currentValue.label.toLowerCase().startsWith(this);
}
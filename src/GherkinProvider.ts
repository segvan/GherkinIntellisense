'use strict';

import * as vscode from 'vscode';
import stepsReader from './gStepsReader'
import stepsFilter from './gStepsFilter'

var allSteps = [];
stepsReader().then(steps => steps.forEach(step => allSteps.push(new vscode.CompletionItem(step))));

export class GherkinProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionList> {
       return new Promise<vscode.CompletionList>((resolve, reject) => {
           if(allSteps.length > 0){
               var line = document.lineAt(position);               
               var filteredSteps = stepsFilter(line, allSteps);
               resolve(new vscode.CompletionList(filteredSteps, true));
           }else{
               resolve(null);
           }
       });
    }
}
'use strict';

import * as vscode from 'vscode';
import { StepsReader } from './gStepsReader'
import stepsFilter from './gStepsFilter'

let allSteps: vscode.CompletionItem[] = new StepsReader().getAllSteps();

export class GherkinProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionList> {
       return new Promise<vscode.CompletionList>((resolve, reject) => {
           if(allSteps.length > 0){
               let line = document.lineAt(position);               
               let filteredSteps = stepsFilter(line, allSteps);
               resolve(new vscode.CompletionList(filteredSteps, true));
           }else{
               resolve(null);
           }
       });
    }
}
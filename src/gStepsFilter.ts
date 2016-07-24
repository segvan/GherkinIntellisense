'use strict';

import * as vscode from 'vscode';

function stepsFilter(currentValue,index,arr) {
    
    var re = new RegExp(this, 'gi');
    var result = currentValue.label.match(re);

    if (result){
        return true;
    } else {
        return false;
    }
}

export default function (line:vscode.TextLine, allSteps:vscode.CompletionItem[]) {    
    var filteredSteps = allSteps.filter(stepsFilter, line.text);
    filteredSteps.forEach(step => step.textEdit = new vscode.TextEdit(line.range, step.label));
    return filteredSteps;
}
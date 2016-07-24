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
    var lineText =  line.text.trim();
    var filteredSteps = allSteps.filter(stepsFilter, lineText);
    var range = new vscode.Range(line.lineNumber, line.firstNonWhitespaceCharacterIndex, line.lineNumber, line.firstNonWhitespaceCharacterIndex + lineText.length);
    filteredSteps.forEach(step => step.textEdit = new vscode.TextEdit(range, step.label));
    return filteredSteps;
}
'use strict';

import * as vscode from 'vscode';
import { Global } from './Global'

export default function (line:vscode.TextLine, allSteps:vscode.CompletionItem[]) {   
   // let lineText =  line.text.replace(Global.paramsAndSpacesRegex, '');
   let lineText = line.text.trim();
    let filteredSteps = allSteps.filter(stepsFilter, lineText);
    let range = new vscode.Range(line.lineNumber, line.firstNonWhitespaceCharacterIndex, line.lineNumber, line.firstNonWhitespaceCharacterIndex + line.text.length);
    filteredSteps.forEach(step => step.textEdit.range = range);
    return filteredSteps;
}

function stepsFilter(currentValue,index,arr) {
    let re = new RegExp(this, 'gi');
    //var result = currentValue.filterText.match(re);
    var result = currentValue.label.match(re);
    if (result){
        return true;
    } else {
        return false;
    }
}

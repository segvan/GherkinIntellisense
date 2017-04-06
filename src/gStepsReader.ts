'use strict';

import * as vscode from 'vscode'
import { Global } from './Global'
declare var require: any

export class StepsReader {   

    LineByLineReader = require('line-by-line');    
    private startRange: vscode.Range = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0));

    public getAllSteps() : vscode.CompletionItem[] {
        let allSteps = [];        
        this.readLines().then(steps => steps.forEach(step => {
            let item = new vscode.CompletionItem(step);
            item.textEdit =  new vscode.TextEdit(this.startRange ,step);
            item.filterText = this.makeFilterText(step);
            allSteps.push(item);
        }));

        return allSteps;
    }

    private makeFilterText(step: string) : string {
        let result = step.replace(Global.paramsAndSpacesRegex, '');
        return result;
    }

    private readLines() {
        return new Promise<string[]>((resolve, reject) =>
        {        
            var lr = new this.LineByLineReader(
                vscode.workspace.rootPath + "\\_toolGerkinAnalyser\\steps-list.feature",
                //"C:\\Users\\sergii\\Documents\\Projects\\GherkinIntellisense\\features\\1.feature",
                        {skipEmptyLines: true}),
            result = [];

            lr.on('error', function (err) {        
                // 'err' contains error object
                vscode.window.showWarningMessage(err.message);
                reject(err.message);
            });

            lr.on('line', function (line) { 
                line = line.trim();
                if(line !== ""){          
                    result.push(line);
                }
            });

            lr.on('end', function () {
                resolve(result);
            });
        });
    }
}
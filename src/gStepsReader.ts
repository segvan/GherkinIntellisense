'use strict';

import * as vscode from 'vscode'

export default function () {
    
    var LineByLineReader = require('line-by-line');
    
    return new Promise<string[]>((resolve, reject) =>
    {        
        var lr = new LineByLineReader(vscode.workspace.rootPath + "\\_toolGerkinAnalyser\\steps-list.feature"),
        result = [];

        lr.on('error', function (err) {        
            // 'err' contains error object
            vscode.window.showWarningMessage(err.message);
            reject(err.message);
        });

        lr.on('line', function (line) {
            result.push(line);
        });

        lr.on('end', function () {
            resolve(result);
        });
    });
}
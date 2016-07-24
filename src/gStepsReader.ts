'use strict';

import { workspace } from 'vscode'

export default function () {
    
    var LineByLineReader = require('line-by-line');
    
    return <PromiseLike<string[]>>new Promise<string[]>((resolve, reject) =>
    {
        var lr = new LineByLineReader("C:\\Users\\STrotsen\\Documents\\Projects\\ConfigurationManager\\web\\test\\Unit4.ConfigurationManager.Web.GuiTests\\features\\featureDefinitions\\_toolGerkinAnalyser\\raw-steps-list.feature"),
        result = [];

        lr.on('error', function (err) {        
            // 'err' contains error object
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
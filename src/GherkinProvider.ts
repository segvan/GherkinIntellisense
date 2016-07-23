'use strict';

import { CompletionItemProvider, TextDocument, Position, CompletionItem, CancellationToken } from 'vscode';

export class GherkinProvider implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Thenable<CompletionItem[]> {
        const lineAt = document.lineAt(position);
        const lineText = document.getText(lineAt.range);
       
        return new Promise((resolve, reject) => {
            var items = ["test1","test2"].map((item) => {
                                        return new CompletionItem(item);
                                    });                                    
            resolve(items);
        });
    }
}
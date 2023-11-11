const vscode = require('vscode');

class YourTreeDataProvider {
    getTreeItem(element) {
        // Return the tree item for your view
        return element;
    }

    getChildren(element) {
        // Return the children for the given tree item
        if (!element) {
            // If no element is passed, return the root level items as a promise
            return Promise.resolve([
                new YourTreeItem('Item 1', vscode.TreeItemCollapsibleState.None),
                new YourTreeItem('Item 2', vscode.TreeItemCollapsibleState.Collapsed)
            ]);
        } else {
            // If an element is passed, return its children
            // For example, this could be a list of more detailed items
            return Promise.resolve([]);
        }
    }
}


class YourTreeItem extends vscode.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.contextValue = 'yourTreeItem';
    }
    
    // Add more properties or methods as needed
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const yourDataProvider = new YourTreeDataProvider();
    vscode.window.registerTreeDataProvider('HALInstance', yourDataProvider);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

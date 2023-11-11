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
				new YourTreeItem('Input Debug Mess Here!', vscode.TreeItemCollapsibleState.showInputBox({
					value: '',
					placeHolder: 'Type something here...'
				})),
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

// I/O Boxes
class InputTreeItem extends vscode.TreeItem {
    constructor() {
        super("Input", vscode.TreeItemCollapsibleState.None);
        this.command = {
            command: 'hal.captureInput',
            title: "Enter Input",
            arguments: [this]
        };
    }
}
class OutputTreeItem extends vscode.TreeItem {
    constructor(output) {
        super(output || "Output will be shown here", vscode.TreeItemCollapsibleState.None);
    }
}
class HalDataProvider {
    constructor() {
        this.output = '';
    }

    getTreeItem(element) {
        return element;
    }

    getChildren() {
        if (this.output) {
            return [new InputTreeItem(), new OutputTreeItem(this.output)];
        } else {
            return [new InputTreeItem()];
        }
    }

    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;

    refresh() {
        this._onDidChangeTreeData.fire();
    }
}
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const halDataProvider = new HalDataProvider();
    vscode.window.registerTreeDataProvider('HALInstance', halDataProvider);
    // const yourDataProvider = new YourTreeDataProvider();
    // vscode.window.registerTreeDataProvider('HALInstance', yourDataProvider);
	    let disposable = vscode.commands.registerCommand('hal.captureInput', async () => {
        const result = await vscode.window.showInputBox({
            prompt: "Enter your input",
            placeHolder: "Type something here..."
        });
        if (result !== undefined) {
            halDataProvider.output = `Processed: ${result}`; // Replace this with your actual processing
            halDataProvider.refresh(); // Refresh the TreeView to show the output
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

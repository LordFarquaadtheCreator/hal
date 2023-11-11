(async () => {
    const module = await import('./cli/cli.mjs');
    module.processInput();
})();
const vscode = require('vscode');

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

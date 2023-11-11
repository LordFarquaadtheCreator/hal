const vscode = require('vscode');

// I/O Boxes
class InputTreeItem extends vscode.TreeItem {
    constructor() {
        super("Input", vscode.TreeItemCollapsibleState.None);
        this.command = {
            command: 'hal.captureInput',
            title: "Enter Debug Error",
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
async function activate(context) {
    const halDataProvider = new HalDataProvider();
    vscode.window.registerTreeDataProvider('HALInstance', halDataProvider);

    let disposable = vscode.commands.registerCommand('hal.captureInput', async () => {
        const result = await vscode.window.showInputBox({
            prompt: "Enter your input",
            placeHolder: "Type something here..."
        });

        if (result !== undefined) {
            try {
                const module = await import('./cli/cli.mjs');
                const res = await module.processInput(result);
                halDataProvider.output = res;
                halDataProvider.refresh();
            } catch (err) {
                console.error(err);
            }
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

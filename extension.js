const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "hal" is now active!');

	let disposable = vscode.commands.registerCommand('hal.helloWorld', function () {
        const terminal = vscode.window.createTerminal({
            name: "Custom Terminal",
            shellPath: "/bin/bash",
        });
        terminal.show();
		terminal.sendText("ls > output.txt");
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

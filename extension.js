const vscode = require('vscode');
const path = require('path');

function getWebviewContent() {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>HAL Webview</title>
            </head>
            <body>
                <h1>Hello from HAL!</h1>
                <textarea id="inputArea"></textarea>
                <button onclick="sendMessage()">Send</button>
                <div id="outputArea"></div>
                <script>
                    const vscode = acquireVsCodeApi();
                    function sendMessage() {
                        const input = document.getElementById('inputArea').value;
                        vscode.postMessage({
                            command: 'input',
                            text: input
                        });
                    }
                </script>
            </body>
            </html>`;
}
// our button that launches the web view
class ButtonProvider {
  getTreeItem(element) {
    return element;
  }

  getChildren() {
    const button = new vscode.TreeItem("Launch HAL", vscode.TreeItemCollapsibleState.None);
    button.iconPath = {
      light: vscode.Uri.file(path.join(__dirname, 'halBlack.png')), // fuck light mode
      dark: vscode.Uri.file(path.join(__dirname, 'halWhite.png'))
    };
    button.command = { command: 'hal.openWebview', title: "Launch HAL Debugger" };
    button.tooltip = "Click to launch the debugger";
    return [button];
  }
}

function activate(context) {
  const buttonProvider = new ButtonProvider();
  vscode.window.registerTreeDataProvider('halView', buttonProvider);

  let disposable = vscode.commands.registerCommand('hal.openWebview', () => {
    const panel = vscode.window.createWebviewPanel(
      'halWebview', 
      'HAL Webview', 
      vscode.ViewColumn.One, 
      {
        enableScripts: true
      }
    );
    panel.webview.html = getWebviewContent();
  });

  context.subscriptions.push(disposable);
}
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
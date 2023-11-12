const vscode = require('vscode');
const path = require('path');

function getWebviewContent() {
    return `

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HAL Webview</title>
    <!-- Axios Script Added Here -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <h1>Hello from HAL!</h1>
    <label for="inputText">Enter Text:</label>
    <textarea id="inputText"></textarea>
    <br>
    <!-- <label for="filePath">Enter File Path:</label>
    <input type="text" id="filePath">
    <br> -->
    <button onclick="sendMessage()">Send</button>
    <div id="outputArea"></div>
</body>
<script>
    const vscode = acquireVsCodeApi();
    
    function sendMessage() {
        const inputText = document.getElementById('inputText').value;
        document.getElementById('outputArea').innerHTML = "I AM THINKING";
        sendInputToApi(inputText);
    }

    async function sendInputToApi(inputText) {
        try {
            const payload = {
                text: inputText,
            };

            const response = await axios.post('http://localhost:4000/api/webview/input', payload);
            const outputArea = document.getElementById('outputArea');
            outputArea.innerHTML = response.data.output; // Display the output in the div
        } catch (error) {
            console.error('Error sending input to API:', error);
        }
    }
</script>
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
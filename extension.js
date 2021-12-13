// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "titan" is now active!');



	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('titan.createview', function (fileUri) {
		// The code you place here will be executed every time your command is executed

		vscode.window.showInputBox({
			title: 'Name',
			placeHolder: 'Name for view'
		}).then( nameview =>{

			const wsedit = new vscode.WorkspaceEdit();
			const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder

			nameview = nameview.toLowerCase().replace(/\s/gmi, '_')

			const filePathHtml = vscode.Uri.file(fileUri._fsPath + `/${nameview}/${nameview}.html`);
			const filePathJS = vscode.Uri.file(fileUri._fsPath + `/${nameview}/${nameview}.js`);
			const filePathCss = vscode.Uri.file(fileUri._fsPath + `/${nameview}/${nameview}.css`);
			wsedit.createFile(filePathHtml, { ignoreIfExists: false });
			wsedit.createFile(filePathJS, { ignoreIfExists: false });
			wsedit.createFile(filePathCss, { ignoreIfExists: false });
			let capitalize = (x)=>{
				return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
			}

			wsedit.insert(filePathJS, new vscode.Position(0, 0),  `
/*
* @module  ${capitalize(nameview)} - [Descripción de la vista]
*
* @author [correo] ([Nombre Completo])
*
* @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
*/

Titan.modules.create({
	name : '${capitalize(nameview)}',
	/*
	* @constructor @description inicia los componentes del módulo
	*/
	ready : function() {

	
	},

});	
								`);
				vscode.workspace.applyEdit(wsedit);
				vscode.window.showInformationMessage('Created a new view: ' + nameview);


		})

		// Display a message box to the user
		// 
	});

	context.subscriptions.push(disposable);

	let disposableSTD = vscode.commands.registerCommand('titan.validate', function (fileUri) {
		// The code you place here will be executed every time your command is executed
		let titanjs = vscode.workspace.getConfiguration('titanjs')
	
		console.log('sTd is done!' + JSON.stringify(titanjs, null, 4));
		console.log(fileUri);

		let stdPath = titanjs.stdPath.replace(/[\\]/gmi, '/')
		
		const terminal = vscode.window.createTerminal('STD_testing');
		terminal.sendText("echo 'Realizando pruebas de estandar de Frontend...'" +  fileUri.path.substring(1));
		terminal.sendText(`node  ${stdPath}/CompilerValidator.js ` + fileUri.path.substring(1));
		terminal.show(true)
		
		// 
	});

	context.subscriptions.push(disposableSTD);

}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

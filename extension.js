// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

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
    let disposable = vscode.commands.registerCommand(
        'titan.createview',
        function (fileUri) {
            // The code you place here will be executed every time your command is executed

            vscode.window
                .showInputBox({
                    title: 'Name',
                    placeHolder: 'Name for view',
                })
                .then((nameview) => {
                    const meses = [
                        'ENE',
                        'FEB',
                        'MAR',
                        'ABR',
                        'MAY',
                        'JUN',
                        'JUL',
                        'AGO',
                        'SEP',
                        'OCT',
                        'NOV',
                        'DIC',
                    ];
                    const fechaActual = new Date();

                    const dia = fechaActual.getDate();
                    const mes = fechaActual.getMonth(); // Los meses comienzan en 0, por lo que enero es 0, febrero es 1, etc.
                    const ano = fechaActual.getFullYear();

                    const fechaFormateada = `${dia} ${meses[mes]} ${ano}`;

                    const wsedit = new vscode.WorkspaceEdit();
                    const wsPath =
                        vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
                    nameview = nameview.toLowerCase().replace(/\s/gim, '_');

                    const path = fileUri._fsPath.replace(/\\/gim, '/');

                    let filePathHtml = path + `/${nameview}/${nameview}.html`;
                    let filePathJS = path + `/${nameview}/${nameview}.js`;
                    let filePathCss = path + `/${nameview}/${nameview}.css`;

                    filePathHtml = filePathHtml
                    filePathJS = filePathJS
                    filePathCss = filePathCss
                    debugger;

                    let capitalize = (x) => {
                        return (
                            x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()
                        );
                    };

                    const template = `
/*
* @module  ${capitalize(nameview)} - [Descripción de la vista]
* @created on ${fechaFormateada}
* @author [${vscode.env.email || 'ingrese el correo'}] (${vscode.env.userName})
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
`;
                    // create folder
                    fs.mkdirSync(path + '/' + nameview);

                    // create  needed files
                    fs.writeFileSync(filePathHtml, `<h1>${nameview}!</h1>`, {
                        encoding: 'utf-8',
                    });

                    fs.writeFileSync(filePathCss, '', {
                        encoding: 'utf-8',
                    });

                    fs.writeFileSync(filePathJS, template, {
                        encoding: 'utf-8',
                    });

                    vscode.window.showInformationMessage(
                        'Created a new view: ' + nameview
                    );
                });

            // Display a message box to the user
            //
        }
    );

    context.subscriptions.push(disposable);

    let disposableSTD = vscode.commands.registerCommand(
        'titan.validate',
        function (fileUri) {
            // The code you place here will be executed every time your command is executed
            let titanjs = vscode.workspace.getConfiguration('titanjs');

            console.log('sTd is done!' + JSON.stringify(titanjs, null, 4));
            console.log(fileUri);

            let stdPath = titanjs.stdPath.replace(/[\\]/gim, '/');

            const terminal = vscode.window.createTerminal('STD_testing');
            terminal.sendText(
                "echo 'Realizando pruebas de estandar de Frontend...'" +
                    fileUri.path.substring(1)
            );
            terminal.sendText(
                `node  ${stdPath}/CompilerValidator.js ` +
                    fileUri.path.substring(1)
            );
            terminal.show(true);

            //
        }
    );

    context.subscriptions.push(disposableSTD);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};

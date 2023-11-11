// const readline = require('readline');
import readline from 'readline';
// const { exec } = require('node:child_process');
import {exec} from 'node:child_process';
// const {debug} = require('./openai_chat.mjs');
import {handleDebug} from './openai_chat.mjs';

// Create an interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

new Promise((resolveOuter) => {
  resolveOuter(
    new Promise((resolveInner) => {
      setTimeout(resolveInner, 1000);
    }),
  );
});

function processInput(input) {
    return new Promise((resolve, reject) => {
        exec(input, (error, stdout, stderr) => {
            if (error) {
                // this is where api will debug
                resolve("\x1b[1m\x1b[31m~~~ I Detected An Error ~~~\n\x1b[0m\x1b[3m\x1b[90mPlease Wait While I Think...\x1b[0m\n" + handleDebug(error));
            }
            else if (stderr) {
                reject(new Error(`stderr: ${stderr}`));
            } else {
                resolve("\x1b[3m\x1b[32m~~~ There Was No Error You Can Relax. Output Below... ~~~\n\x1b[0m"+ stdout);
            }
        });
    });
}
// Ask for user input
rl.question("\x1b[1mWelcome to \x1b[31mHAL\x1b[0m.\x1b[0m \n\x1b[3m\x1b[90mRemember, you're being watched...\x1b[0m\n\x1b[42mLet's debug your code.\x1b[0m\n", (input) => {    processInput(input)
        .then((result) => {
            console.log(result);
            rl.close(); // Only close the readline interface after processing is complete
        })
        .catch((err) => {
            console.error(err);
            rl.close(); // Close the readline interface in case of an error as well
        });
});

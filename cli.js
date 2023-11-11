const readline = require('readline');
const { exec } = require('node:child_process');


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


// Function to capture input and return output
function processInput(input) {
    return new Promise((resolve, reject) => {
        exec(input, (error, stdout, stderr) => {
            if (error) {
                // this is where api will debug
                resolve("~~~ I Detected An Error ~~~");
            }
            else if (stderr) {
                reject(new Error(`stderr: ${stderr}`));
            } else {
                resolve('~~~ There Was No Error You Can Relax. Output Below. ~~~\n'+ stdout);
            }
        });
    });
}
// Ask for user input
rl.question("Welcome to HAL. Remember, you're being watched.\n", (input) => {
    processInput(input)
        .then((result) => {
            console.log(result);
            rl.close(); // Only close the readline interface after processing is complete
        })
        .catch((err) => {
            console.error(err);
            rl.close(); // Close the readline interface in case of an error as well
        });
});
const readline = require('readline');
const { exec } = require('child_process');


// Create an interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to capture input and return output
function processInput(input, callback) {
    exec(input, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution error: ${error}`);
            callback(`Error: ${error}`, null);
            return;
        }

        if (stderr) {
            callback(`stderr: ${stderr}`, null);
        } else {
            callback(null, stdout);
        }
    });
}

// Ask for user input
rl.question("Welcome to HAL. Remember, you're being watched.\n", (input) => {
    console.log(processInput(input, (err, result) =>{
        if(err){
            console.error(err);
        } else{
            console.log(result);
        }
    }));

    rl.close();
});

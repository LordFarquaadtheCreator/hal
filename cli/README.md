# gptCLI
gpt powered cli which will debug/assist in explaining errors of your code

# How To Use
- all you have to do is to run the function with `node cli.mjs`
- from there, a new command line session will start
    - from this, you can run one command in **NODE.JS** only
    - if there is no bug, you will get a green message saying that and your output
    - if there is a bug, you will get a red message saying that and a gpt-4 powered suggestion on how to fix it
- you will have to provide your own GPT key
    - make sure it exists with a `.env` file so that the program can call the variable

# How It Works
- `openai_chat.mjs` file literally just handles the prompting of GPT-4 (you can edit it to use a cheaper model)
- this is exported so that we can use it in `cli.mjs`
    - CLI stands for `command` `line` `interface`
    - this allows the application to input the command and interpret the output
        - ex: `node cli.mjs` then `node test.js`
            - this will capture the output and error output of test.js (whichever is applicable)
- the `cli.mjs` application will prompt GPT-4 with the error and ask it to debug it
    - by default it also takes the user's code (the entire file) in as well
- this takes some time (we're using promises)
- finally, the output is displayed to the user and the application closes!

# Install (Dependencies)
- `npm i`
- `npm i openai`
- `npm i dotenv`
- `npm i node:child_process`
- `npm i readline`
- i may have missed some ...

# Test
- test it out with `node cli.mjs` and `node test.js`
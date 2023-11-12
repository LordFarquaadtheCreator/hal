# hal
he will not kill you

(yet)

There are **two** versions of this application you can run
1) Run the CLI
    - this will allow you to run your code as if it was a regular shell
    - if the code outputs an error, it will debug
    - if the code outputs no error, it will not debug
2) Run the `HAL` Extension and paste your debug error in the web view
    - it is pretty straight forward

## How It Works
- the server must be up and running in order for the extension to call the GPT API for the extension
- gpt ai

## How To Set It Up
- `npm i`
- in `dir` "server"
    - `npm i`
    - `npm i express`
    - `npm i nodemon`
    - `npm i openai`
    - `npm i http`
    - `npm i cors`
    - `npm i path`

- in `dir` "cli"
    - create `.env` file with `OPENAI_API_KEY` value
    - `npm i readline`
    - `npm i child_process`
    - `npm i fs`
    - `npm i express`
    - `npm i cors`
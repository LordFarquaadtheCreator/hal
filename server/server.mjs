import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import { readFileContents, processInput } from '../cli/cli.mjs';

const app = express();

app.use(express.json());
app.use(cors())



app.post('/api/webview/input', async (req, res) => {
    try {
        const input = req.body.text;
        const file = req.body.file;
        // console.log('Received input:', input);
        // console.log('Received file path:', file);

        readFileContents(file, async (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Error reading file" });
                return;
            }

            processInput(input, data).then(result => {
                res.json({ 
                    success: true, 
                    output: result
                });
            }).catch(error => {
                console.error(error);
                res.status(500).json({ error: "Error processing input" });
            });
        });
    } catch (error) {
        console.error("Error in input", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

let data = [];

        app.get('/getData', (req, res) => {
            const rawData = fs.readFileSync('projects.json');
            const data = JSON.parse(rawData);
            res.json(data);
        });

        // Start the serverr
        app.listen(PORT, () => {
            console.log(`Server is rnning on port ${PORT}`);
        });
   

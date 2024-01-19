import express from 'express';
import pkg from 'body-parser';

import {
    readFile,
    writeFile
} from 'fs/promises';

const {
    json
} = pkg;
const app = express();
const PORT = 5000;
const dataFilePath = './projects.json';

// Middleware to parse JSON requests
app.use(json());

// Initialize data from the JSON file
let data = [];

async function loadData() {
    try {
        const fileContent = await readFile(dataFilePath, 'utf-8');
        data = JSON.parse(fileContent);
    } catch (error) {
        console.error('Error loading data from the file', error);
    }
}

async function saveData() {
    try {
        await writeFile(dataFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving data to the file', error);
    }
}

// Load initial data
loadData();

// GET: Retrieve all items
app.get('/api/items', (req, res) => {
    res.json(data);
});

// POST: Create a new item
app.post('/api/items', (req, res) => {
    const newItem = req.body;
    data.push(newItem);
    saveData().then(() => res.json(newItem));
});

// PUT: Update an existing item
app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    data = data.map(item => (item.id === itemId ? updatedItem : item));
    saveData().then(() => res.json(updatedItem));
});

// DELETE: Delete an item
app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    data = data.filter(item => item.id !== itemId);
    saveData().then(() => res.json({
        message: 'Item deleted successfully'
    }));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
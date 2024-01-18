import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const mongoURL = process.env.MONGO_URL || '';
mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB");

        // Define the Employee schema and model
        const employeeSchema = new mongoose.Schema({
            // Define the schema fields for the Employee model
            // For example:

            name: String,
            position: String,
            office: String,
            age: String,
            startDate: Date,
            salary: String,
        });

        const Employees = mongoose.model('Employees', employeeSchema);

        // API route to get all employees
        app.get('/api/employees', async (req, res) => {
            try {
                // Find all documents in the Employees collection
                const employees = await Employees.find({});
                console.log('DATA', {
                    employees,
                    db: mongoose.connection.db.databaseName
                }, )
                res.json(employees);
            } catch (error) {
                console.error('Error fetching employees:', error);
                res.status(500).json({
                    error: 'Internal Server Error'
                });
            }
        });

        // Start the serverr
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error("Error connecting to MongoDB", err));

console.log('index js exprMMMMMsss');
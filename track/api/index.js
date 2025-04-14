const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Fixed typo
const Transaction = require('./models/Transaction.js');
const mongoose = require('mongoose'); // Removed default import
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Expressvaibhav!');
});

app.post('/api/transaction', async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const { name, description, datetime, price } = req.body;
    const transaction = await Transaction.create({ name, description, datetime, price });
    res.json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await mongoose.connection.close(); 
  }
});

app.get('/api/transactions', async (req, res) => { 
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await mongoose.connection.close(); 
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
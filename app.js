const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');

const connectDB = require('./Config/MongoDBConfig');
const mainRouter = require('./Router/MainRouter');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

//Database connection
connectDB();

app.use('/api', mainRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
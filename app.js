require('dotenv').config();
const express = require('express');
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

app.get('/ping',(req,res) => {
  res.send('ping').status(200);
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
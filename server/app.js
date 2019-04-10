import express from 'express';
import userRouter from './Controllers/users';
import accountRouter from './Controllers/account';
import transactionRouter from './Controllers/transaction';
import validateToken from './middleware/ValidateToken';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  res.status(200).json({
    "status": 200,
    "error": "WELCOME TO BANKA"
  })
})
app.use('/api/v1/users', userRouter);
app.use('/api/v1/accounts', validateToken, accountRouter);
app.use('/api/v1/transactions', validateToken, transactionRouter);
app.use('*', (req, res) => {
  res.status(404).json({
    "status": 404,
    "error": "The page you requested does not exist"
  })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});
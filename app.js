require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter = require('./routes/auth.js')
const openAiRouter = require('./routes/OpenAI.js')
const connectDb = require('./db/connect')
const authenticatedUser = require('./middleware/authentication');

app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('Travel Helper api');
});
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/get_result',authenticatedUser,openAiRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
await connectDb(process.env.MONGO_URI)

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

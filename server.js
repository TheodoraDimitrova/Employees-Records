const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect Database
connectDB();

//Init middleware
app.use(express.json({ extended: false })); //for excepting the body data

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));

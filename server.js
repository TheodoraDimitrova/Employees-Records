const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect Database
connectDB();
//Init middleware
app.use(express.json({extended:false}))//for excepting the body data

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the employee records API...' })
);
//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/profile', require('./routes/profiles'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));

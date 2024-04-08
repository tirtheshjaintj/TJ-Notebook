const db = require('./db');
const express = require('express');
var cors = require('cors') ;
const app = express();
require('dotenv').config();
const port = process.env.port || 8000;
db();
// const corsOptions = {
//   origin: '',
//   methods:["POST","GET","PUT","PATCH","DELETE"],
//   credentials:true
// };
app.use(cors());
app.use(express.json());
// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.listen(port, () => {
  console.log(`TJ Notebook Started Backend at http://localhost:${port}`);
})
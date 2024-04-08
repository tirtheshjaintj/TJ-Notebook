const db = require('./db');
const express = require('express');
var cors = require('cors') ;
const app = express();
const port = 8000;
db();
const corsOptions = {
  origin: 'https://tj-notebook-front.vercel.app',
  methods:["POST","GET","PUT","PATCH","DELETE"],
  credentials:true
};
app.use(cors(corsOptions));
app.use(express.json());
// Available Routes
app.get('/',(req,res)=>{
  return res.send("Working Fine I am Backend");
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.listen(port, () => {
  console.log(`TJ Notebook Started Backend at https://tj-notebook-front.vercel.app:${port}`);
})
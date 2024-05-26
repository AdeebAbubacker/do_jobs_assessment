const express = require('express');
const connectDB = require('./db/connect.js'); 
const userRoutes = require('./routes/userRoutes/userRoutes.js');
const slotRoutes = require('./routes/slotRoutes/slotRoutes.js');
const groupRoutes = require('./routes/groupRoutes/groupRoutes.js');

const app = express();
app.use(express.json()); 

connectDB();

app.use('/api', userRoutes);
app.use('/api', slotRoutes); 
app.use('/api', groupRoutes); 

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


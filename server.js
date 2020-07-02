const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const inventoryRoutes = require('./routes/inventory');

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on PORT ${process.env.PORT}`);
});

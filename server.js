const express = require('express');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();    // database online

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API RUNNING'));

/* Initialize routes */
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

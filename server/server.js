require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/user', require('./routes/user.js'));
app.use('/api/services', require('./routes/service.js'));
app.use('/api/tags', require('./routes/tag.js'));
app.use('/api/user/tags', require('./routes/userTag'));

const PORT = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
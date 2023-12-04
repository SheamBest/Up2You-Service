const express = require ('express');
const cors = require ('cors');

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(cors());

const userRouter = require('./routes/user.js');
const adminRouter = require('./routes/administrator.js');
const serviceRouter = require('./routes/service.js');
const favouriteRouter = require('./routes/favourites.js');
const saved_serviceRouter = require('./routes/saved_service.js');

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/service', serviceRouter);
app.use('/favs', favouriteRouter);
app.use('/saved', saved_serviceRouter);

module.exports = app;
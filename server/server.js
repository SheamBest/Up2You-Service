const db = require('./models/index.js');
const app = require('./index.js');

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('server is running');
    });
});
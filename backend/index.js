const App = require('./app')
App.start();
App.syncDatabaseTables().then(() => {
    console.log('Database tabled synced successfully')
}).catch(e => {
    console.log(e)
});
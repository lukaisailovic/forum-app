require('dotenv').config()
const express = require('express');
const sync = require('./database/sync')
const history = require('connect-history-api-fallback')
const path = require('path')

const routers = [
    require('./users'),
    require('./boards'),
    require('./topics'),
    require('./posts')
];


class App {
    constructor() {
        this.app = express();
    }
    setupMiddleware(){
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');

            next();
        });
        const staticMiddleware = express.static(path.join(__dirname,'dist'));
        this.app.use(staticMiddleware);
        this.app.use(history());
        this.app.use(staticMiddleware);


    }
    setupRoutes(){
        for (const router of routers) {
            this.app.use(router);
        }
        // this.app.get('/',(req, res)=>{
        //     res.json({
        //         'hello': 'world'
        //     })
        // })
    }
    start(){
        this.setupMiddleware()
        this.setupRoutes()
        try {
            const port = process.env.PORT || 3000;
            this.app.listen(port);
            console.log(`Server started on port ${port}`);
        } catch (err) {
            console.log(err);
        }
    }
    async syncDatabaseTables(){
        await sync();
    }
}
module.exports = new App();
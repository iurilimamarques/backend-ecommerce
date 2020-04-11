const express = require('express');
//const cors = require('cors');
const routes = require('./routes.js');

const app = express();

/*const whitelist = ['http://localhost:3000/api-ecommerce'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}*/

//app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use('/api-ecommerce', routes);

app.listen(3000);

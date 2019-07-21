import express from 'express';
import bodyParser from 'body-parser'
import morgan from 'morgan';
import {router} from './src/router'
import './src/database'
import config from './src/config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));


app.use('/api/v1',router);

app.listen(config.port, () => {
    console.log('Example app listening on port', config.port);
});

export default app;
require('dotenv').config({path: `${__dirname}/../.env`});
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
const PORT = process.env.PORT || 3000;

let dataCity = '';

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send(dataCity);
})

app.listen(PORT, async () => {
    try {
        dataCity = JSON.parse(await fs.readFile(`${__dirname}/../data/city.list.json`, { encoding: 'utf8' }));
        console.log('Server ready');
    } catch (error) {
        console.log(error);
    }
})

//version 1.0.0
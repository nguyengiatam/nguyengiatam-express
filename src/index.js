require('dotenv').config({path: `${__dirname}/../.env`});
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
const PORT = process.env.PORT || 3000;

let dataCity = '';

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('this is hotfix api get all city');
    res.status(200).send(dataCity);
})

app.get('/id/:id', (req, res) => {
    const city = dataCity.find(val => val.id == req.params.id)
    city ? res.status(200).send(city) : res.status(404).send() 
})

app.get('/name/:cityName', (req, res) => {
    const cityName = req.params.cityName.split('-').join(' ')
    const city = dataCity.find(val => val.name == cityName)
    city ? res.status(200).send(city) : res.status(404).send() 
})

app.get('/country/:country', (req, res) => {
    const cityList = dataCity.filter(val => val.country == req.params.country)
    res.status(200).send(cityList);
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
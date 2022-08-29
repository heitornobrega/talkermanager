const express = require('express');
const readData = require('../functions/readJson');

const talkerRoutes = express.Router();

talkerRoutes.get('/', async (req, res) => {
    const data = await readData();
    res.status(200).json(data);
  });

module.exports = talkerRoutes;
const express = require('express');
const readData = require('../utils/readJson');
const dataFileValidator = require('../middlewares/dataFileValidator');
const talkerIdValidator = require('../middlewares/talkerIdValidator');

const talkerRoutes = express.Router();

talkerRoutes.get('/', dataFileValidator, async (req, res) => {
    const data = await readData();
    res.status(200).json(data);
});

talkerRoutes.get('/:id', talkerIdValidator, async (req, res) => {
  const data = await readData();
  const { id: idParams } = req.params;
  const user = data.find(({ id }) => id === Number(idParams));
  res.status(200).json(user);
});

module.exports = talkerRoutes;
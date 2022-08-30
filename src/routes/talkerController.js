const express = require('express');
const readData = require('../utils/readJson');
const writeData = require('../utils/writeJson');
const dataFileValidator = require('../middlewares/dataFileValidator');
const talkerIdValidator = require('../middlewares/talkerIdValidator');
const ageValidator = require('../middlewares/ageValidator');
const nameValidator = require('../middlewares/nameValidator');
const rateValidator = require('../middlewares/rateValidator');
const talkValidator = require('../middlewares/talkValidator');
const tokenValidator = require('../middlewares/tokenValidator');
const watchedAtValidator = require('../middlewares/watchedAtValidator');

const talkerRoutes = express.Router();

talkerRoutes.use(express.json());

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

talkerRoutes.post(
  '/',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
  async (req, res) => {
    const data = await readData();
    console.log(data);
    const newId = data.length + 1;
    const newData = [...data, { id: newId, ...req.body }];
    writeData(newData);
    const updatedData = await readData();
    const lastTalker = updatedData[updatedData.length - 1];
    res.status(201).json(lastTalker);
},
);

module.exports = talkerRoutes;
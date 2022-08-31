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
// const idValidator = require('../middlewares/idValidator');

const talkerRoutes = express.Router();

talkerRoutes.use(express.json());

talkerRoutes.get('/', dataFileValidator, async (req, res) => {
  const data = await readData();
  res.status(200).json(data);
});

talkerRoutes.get('/search', tokenValidator, async (req, res) => {
  const { q } = req.query;
  const data = await readData();
  if (!q) return res.status(200).json(data);
  const result = data.filter(({ name }) => name.includes(q));
  if (!result) return res.status(200).json([]);
  return res.status(200).json(result);
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
    const lastTalker = updatedData.at(-1);
    res.status(201).json(lastTalker);
  },
);

talkerRoutes.put(
  '/:id',
  // idValidator,
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
  async (req, res) => {
    const { id } = req.params;
    const idInt = Number(id);
    const data = await readData();
    const userData = data.find((users) => users.id === idInt);
    console.log(userData);
    if (!userData) {
      res.status(401).json({ message: 'Not Found' });
    }
    const userIndex = data.indexOf(userData);
    const updatedUser = { ...req.body, id: idInt };
    data.splice(userIndex, 1, updatedUser);
    await writeData(data);
    const newData = await readData();
    const updatedUserFromDb = newData[userIndex];
    res.status(200).json(updatedUserFromDb);
  },
);

talkerRoutes.delete('/:id', tokenValidator, async (req, res) => {
  const { id } = req.params;
  const idInt = Number(id);
  const data = await readData();
  const userData = data.find((users) => users.id === idInt);
  console.log(userData);
  if (!userData) {
    res.status(401).json({ message: 'Not Found' });
  }
  const userIndex = data.indexOf(userData);
  if (userIndex > -1) { 
    data.splice(userIndex, 1);
  }
  await writeData(data);
  res.sendStatus(204);
});

module.exports = talkerRoutes;

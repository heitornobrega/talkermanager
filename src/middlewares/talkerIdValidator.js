const readData = require('../functions/readJson');

const talkerIdValidator = async (req, res, next) => {
    const data = await readData();
    const { id: idParams } = req.params;
    const idIsValid = data.find(({ id }) => id === Number(idParams));
    if (!idIsValid) {
        return res.status(404).json({
            message: 'Pessoa palestrante não encontrada',
          });
    }
    next();
};
module.exports = talkerIdValidator;
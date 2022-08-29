const readData = require('../utils/readJson');

const dataFileValidator = async (req, res, next) => {
    const data = await readData();
    if (!data) {
        return res.status(200).json([]);
    }
    next();
};

module.exports = dataFileValidator;

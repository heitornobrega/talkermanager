const readData = require('../functions/readJson');

const dataFileValidator = async (req, res, next) => {
    const data = await readData();
    if (!data) {
        console.log('arrayvazio');
        return res.status(200).json([]);
    }
    next();
};

module.exports = dataFileValidator;

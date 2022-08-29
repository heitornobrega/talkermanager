const express = require('express');
const userDataValidator = require('../middlewares/userDataValidator');
const generateToken = require('../utils/generateToken');

const loginRoutes = express.Router();

loginRoutes.post(
    '/',
    userDataValidator,
    (req, res) => {
        const token = generateToken();
        res.status(200).json({ token });
    },
);

module.exports = loginRoutes;
const express = require('express');
const userEmailValidator = require('../middlewares/userEmailValidator');
const generateToken = require('../utils/generateToken');
const userPasswordValidator = require('../middlewares/userPasswordValidator');

const loginRoutes = express.Router();

loginRoutes.post(
    '/',
    userEmailValidator,
    userPasswordValidator,
    (req, res) => {
        const token = generateToken();
        res.status(200).json({ token });
    },
);

module.exports = loginRoutes;
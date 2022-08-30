const validateEmail = require('../utils/validateEmail');

function userEmailValidator(req, res, next) {
    const { email } = req.body;
    const emailIsValid = validateEmail(email);
    if (!email) {
        return res.status(400).json({
            message: 'O campo "email" é obrigatório',
        });
    }
    if (!emailIsValid) {
        return res.status(400).json({
            message: 'O "email" deve ter o formato "email@email.com"',
        });
    }
    next();
}

module.exports = userEmailValidator;
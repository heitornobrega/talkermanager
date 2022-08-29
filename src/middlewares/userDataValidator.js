const userDataValidator = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: 'email or password empty' });
    }
    next();
};

module.exports = userDataValidator;
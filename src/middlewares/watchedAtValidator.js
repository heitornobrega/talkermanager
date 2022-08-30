const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
function watchedAtValidator(req, res, next) {
    const { watchedAt } = req.body.talk;
    if (!watchedAt) {
      return res.status(400).json({
        message: 'O campo "watchedAt" é obrigatório',
      });
    }
    if (!(dateRegex.test(watchedAt))) {
      return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }
    next();
}

module.exports = watchedAtValidator;
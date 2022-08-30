const validateEmail = (email) => String(email)
      .toLowerCase()
      .match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      );

module.exports = validateEmail;
const validateJournalInput = (req, res, next) => {
  const error = [];
  let { location, message } = req.body;

  location = location.toString().trim();
  if (!/^[\w\d][ ,\.!\"\'-\d\w\s]{1,50}$/.test(location)) {
    error.push('Location should be between 2 to 50 chars');
  } else res.locals.location = location;

  message = message.toString().trim();
  if (!/^[\w\d][ ,\.!\"\'-\d\w\s]{0,280}[\w\d]$/.test(message)) {
    error.push('Message should be between 2 - 280');
  } else res.locals.message = message;

  if (error[0]) {
    return res.status(400).send({
      status: 400,
      error,
    });
  }
  return next();
};

module.exports = validateJournalInput;

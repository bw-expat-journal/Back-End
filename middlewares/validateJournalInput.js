const validateJournalInput = (req, res, next) => {
  const error = [];
  let { location, post } = req.body;

  location = location.toString().trim();
  if (!/^[\w\d][ -\d\w]{1,50}$/.test(location)) {
    error.push('Location should be between 2 to 50 chars');
  } else res.locals.location = location;

  post = post.toString().trim();
  if (!/^[\w\d][-\d\w\s]{0,280}[\w\d]$/.test(post)) {
    error.push('Post should be between 2 - 280');
  } else res.locals.post = post;

  if (error[0]) {
    return res.status(400).send({
      status: 400,
      error,
    });
  }
  return next();
};

module.exports = validateJournalInput;

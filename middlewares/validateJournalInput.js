const validateJournalInput = (req, res, next) => {
  const error = [];
  let {
    location, message, caption, image_url,
  } = req.body;

  location = location.toString().trim();
  if (!/^[\w\d][ ,.!"'\\-\d\w\s]{1,50}$/.test(location)) {
    error.push('Location should be between 2 to 50 chars');
  } else res.locals.location = location;

  message = message.toString().trim();
  if (!/^[\w\d][ ,.!"'-\\\d\w\s]{0,280}$/.test(message)) {
    error.push('Message should be between 2 - 280');
  } else res.locals.message = message;

  caption = caption && caption.toString().trim();
  if (caption && !/^[\w\d][ ,.!"'-\\\d\w\s]{0,280}$/.test(caption)) {
    error.push('Caption should be between 2 - 280');
  } else res.locals.caption = caption;

  image_url = image_url && image_url.toString().trim();
  if (
    image_url
    && !/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      image_url,
    )
  ) {
    error.push('image_url must be a valid url');
  } else res.locals.image_url = image_url;

  if (error[0]) {
    return res.status(400).send({
      status: 400,
      error,
    });
  }
  return next();
};

module.exports = validateJournalInput;

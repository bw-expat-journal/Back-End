/* eslint-disable prefer-destructuring */
const resolvePostType = (req, res, next) => {
  const urlRoot = req.originalUrl.split('/');
  if (urlRoot[3] === 'auth') {
    res.postType = urlRoot[4];
  } else {
    res.postType = urlRoot[3];
  }
  next();
};
module.exports = resolvePostType;

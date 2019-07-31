const jwt = require('jsonwebtoken');

const joinStrings = (strings) => {
  const stringArray = strings.map(x => `${x},`);
  stringArray[stringArray.length - 1] = `and ${stringArray[stringArray.length - 1].slice(0, -1)}`;
  stringArray[stringArray.length - 2] = stringArray[stringArray.length - 2].slice(0, -1);
  return stringArray.join(' ');
};

const populateError = (req, ...fields) => {
  const error = [];
  fields.forEach((field) => {
    if (!req.body[field]) error.push(field);
  });
  return error;
};

const setErrorMsg = (error) => {
  let errorMsg;
  if (error.length === 1) {
    errorMsg = `No values provided for ${error[0]}`;
  } else {
    errorMsg = `No values provided for ${joinStrings(error)}`;
  }
  return errorMsg;
};

const generateToken = (id, is_admin) => {
  const token = jwt.sign(
    {
      userId: id,
      is_admin,
    },
    process.env.SECRET,
    { expiresIn: '7d' },
  );
  return token;
};

module.exports = {
  joinStrings,
  populateError,
  setErrorMsg,
  generateToken,
};

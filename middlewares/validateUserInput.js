const validateUserInput = (req, res, next) => {
  const error = [];
  const { password, confirm_password } = req.body;
  let { first_name, email, last_name } = req.body;
  console.log(email);
  if (password !== confirm_password) error.push('Passwords do not match.');
  else res.locals.password = password;

  if (password.length < 6 || password.length > 32) {
    error.push('Password too short or too long. Pls provide password between 8 and 32 chars.');
  }

  first_name = first_name.toString().trim();
  if (!/^[a-zA-Z][ \-a-zA-Z]{1,50}$/.test(first_name)) {
    error.push('Firstname provided is not valid. Only lowercase/uppercase letters between 2 and 59 characters are allowed.');
  } else res.locals.first_name = first_name;

  last_name = last_name.toString().trim();
  if (!/^[a-zA-Z][ \-a-zA-Z]{1,50}$/.test(last_name)) {
    error.push('Lastname provided is not valid. Only lowercase/uppercase letters between 2 and 59 characters are allowed.');
  } else res.locals.last_name = last_name;

  // eslint-disable-next-line no-control-regex
  email = String(email.replace(/\u0000/g, '')).trim();
  if (!/^[\w\d.\-_]+@[\w\d.\-_]+\.[\w\d]{1,9}(\.[\w\d\\]{2,9})?$/.test(email)) {
    error.push('Email provided is not valid.');
  } else res.locals.email = email;

  if (error[0]) {
    return res.status(400).send({
      status: 400,
      error,
    });
  }
  return next();
};

module.exports = validateUserInput;

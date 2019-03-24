import crypto from 'crypto';
import validator from 'validator';
import humanizeString from 'humanize-string';

const { BUFFER, ENCODING } = process.env;

const handleValidation = (res, inputObject) => {
  const errors = {};
  Object.entries(inputObject).forEach(([key, value]) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors[key] = `${humanizeString(key)} must not be empty`;
    } else if (key === 'email' && !validator.isEmail(value)) {
      errors[key] = 'Email is not valid';
    }
  });
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors
    });
  }
  return false;
};


const handleErrorMessage = (res, error) => {
  console.log(error);
};

const key = Buffer.from(BUFFER, ENCODING);

const encrypt = (data) => {
  const cipher = crypto.createCipher('aes256', key);
  let crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decrypt = (data) => {
  const decipher = crypto.createDecipher('aes256', key);
  let decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};

export {
  encrypt,
  decrypt,
  handleValidation,
  handleErrorMessage
};

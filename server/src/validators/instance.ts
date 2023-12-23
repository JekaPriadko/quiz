import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export default () => {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  return ajv;
};

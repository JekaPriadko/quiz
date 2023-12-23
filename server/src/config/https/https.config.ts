import fs from 'fs';
import path from 'path';

const httpsConfig = {
  key: fs.readFileSync(path.join(__dirname, './ssl/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './ssl/cert.pem')),
};

export default httpsConfig;

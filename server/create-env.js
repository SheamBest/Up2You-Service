const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  const content = `JWT_SECRET=supersecretkey\nPORT=3001\n`;
  fs.writeFileSync(envPath, content, 'utf8');
  console.log('.env file created');
} else {
  console.log('.env file already exists');
}

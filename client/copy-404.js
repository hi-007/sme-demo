// client/copy-404.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');
const indexFile = path.join(distPath, 'index.html');
const errorFile = path.join(distPath, '404.html');

fs.copyFile(indexFile, errorFile, (err) => {
  if (err) {
    console.error('Error copying 404.html:', err);
  } else {
    console.log('404.html created successfully');
  }
});

const fs = require('node:fs/promises');
const fsNotPromise = require('fs');
const path = require('path');

const defaultPath = path.join(__dirname, 'styles');
const newFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

const bundleCSS = async () => {
  const writeStream = fsNotPromise.createWriteStream(newFilePath);
  try {
    const files = await fs.readdir(defaultPath);

    for (let file of files) {
      const filePath = path.join(defaultPath, file);
      const stat = await fs.stat(filePath);
      if (stat.isFile() && path.extname(file) === '.css') {
        const readStream = fsNotPromise.createReadStream(filePath);

        readStream.pipe(writeStream, { end: false });
        readStream.on('end', () => {
          writeStream.write('\n');
        });
      }
    }
    writeStream.on('finish', () => {});
  } catch (error) {
    console.log('Error >>', error);
  }
};
bundleCSS();

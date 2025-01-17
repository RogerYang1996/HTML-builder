const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'secret-folder');

fs.readdir(filePath, (error, file) => {
  if (error) {
    return console.log('error');
  }
  file.forEach((files) => {
    const fileInFolderPath = path.join(filePath, files);
    fs.stat(fileInFolderPath, (error, stats) => {
      if (error) {
        return console.log('error');
      }
      if (stats.isFile()) {
        const fileName = path.basename(files, path.extname(files));
        const fileExtension = path.extname(files).slice(1);
        const fileSize = stats.size;
        console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
      }
    });
  });
});

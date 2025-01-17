const fs = require('fs');
const path = require('path');

const initFolderPath = path.join(__dirname, 'files');
const copyFolderPath = path.join(__dirname, 'files-copy');

const deletaddfiles = (initial, created) => {
  fs.mkdir(created, { recursive: true }, (error) => {
    if (error) {
      return console.log('error 1');
    }
    console.log('folder is create');
    fs.readdir(initial, (error, files) => {
      if (error) {
        return console.log('error 2');
      }
      files.forEach((file) => {
        const copyFile = path.join(initial, file);
        const copyDir = path.join(created, file);
        fs.stat(copyFile, (error, stats) => {
          if (error) {
            return console.log('error 4');
          }
          if (stats.isFile()) {
            fs.copyFile(copyFile, copyDir, (error) => {
              if (error) {
                return console.log('error 3');
              }
            });
          }
        });
      });
      fs.readdir(created, (error, initFile) => {
        if (error) {
          console.log('error');
        }
        initFile.forEach((file) => {
          if (!files.includes(file)) {
            const deletetFile = path.join(created, file);
            fs.unlink(deletetFile, (error) => {
              if (error) {
                console.log('error');
              }
            });
          }
        });
      });
    });
  });
};
deletaddfiles(initFolderPath, copyFolderPath);

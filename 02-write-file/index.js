const fs = require('fs');
const readline = require('readline');
const path = require('path');

const pathFile = path.join(__dirname, 'output-text.txt');

const output = fs.createWriteStream(pathFile);
const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('write any word: ');
rl.prompt();
rl.on('line', (text) => {
  if (text.trim() === 'exit') {
    rl.close();
  } else {
    output.write(text + ' ');
    rl.prompt();
  }
}).on('close', () => {
  console.log('\nthanks for the text');
  rl.close();
});

const fs = require('fs');
const path = require('path');

const root = __dirname;
const srcDir = path.join(root, 'src');
const distDir = path.join(root, 'dist');
const dataPath = path.join(root, 'data.json');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function replaceTokens(content) {
  return content.replace(/{{\s*([A-Z0-9_]+)\s*}}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      return String(data[key]);
    }
    return match;
  });
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
      continue;
    }
    if (entry.isFile()) {
      if (entry.name.endsWith('.html')) {
        const content = fs.readFileSync(srcPath, 'utf8');
        fs.writeFileSync(destPath, replaceTokens(content), 'utf8');
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
copyDir(srcDir, distDir);
console.log('Built dist/ from src/');

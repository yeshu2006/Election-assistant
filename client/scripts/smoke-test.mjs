import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const sourceRoot = join(root, 'src');

function collectFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      collectFiles(path, files);
    } else {
      files.push(path);
    }
  }
  return files;
}

const sourceFiles = collectFiles(sourceRoot).filter((file) => /\.(js|jsx|json)$/.test(file));
const leakedKeyPattern = /AIza[0-9A-Za-z_-]{20,}/;
const leakedFiles = sourceFiles.filter((file) => leakedKeyPattern.test(readFileSync(file, 'utf8')));

if (leakedFiles.length) {
  console.error('Committed Google API key-like value found in:');
  for (const file of leakedFiles) console.error(`- ${relative(root, file)}`);
  process.exit(1);
}

const manifestos = JSON.parse(readFileSync(join(sourceRoot, 'data', 'manifestos.json'), 'utf8'));
const cities = JSON.parse(readFileSync(join(sourceRoot, 'data', 'indianCities.json'), 'utf8'));

if (!Array.isArray(manifestos) || manifestos.length < 5) {
  console.error('Manifesto dataset is missing or unexpectedly small.');
  process.exit(1);
}

if (!Array.isArray(cities) || cities.length < 100) {
  console.error('Indian cities dataset is missing or unexpectedly small.');
  process.exit(1);
}

console.log('Smoke checks passed.');

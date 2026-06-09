// Assembles static HTML pages from src/ + partials/.
// Each src/<path>.html becomes <path>/index.html at the repo root
// (src/index.html stays index.html). Partials are injected via
// <!-- include:name --> markers; {{base}} resolves to the relative
// path prefix back to the repo root so the same markup works at any depth.
// {{home}} resolves to the homepage path so nav anchors work everywhere.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';

const SRC = 'src';
const PARTIALS = 'partials';

const partials = {};
for (const file of readdirSync(PARTIALS)) {
  if (file.endsWith('.html')) {
    partials[file.replace(/\.html$/, '')] = readFileSync(join(PARTIALS, file), 'utf8');
  }
}

function findHtml(dir) {
  let out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out = out.concat(findHtml(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

const sources = findHtml(SRC);
if (!sources.length) {
  console.log('build:html — no source files in src/');
  process.exit(0);
}

for (const srcFile of sources) {
  const rel = relative(SRC, srcFile);
  // Files prefixed with _ are templates, not real pages — skip them.
  if (rel.split('/').some(seg => seg.startsWith('_'))) {
    console.log(`build:html — skipping template ${srcFile}`);
    continue;
  }

  const outPath = rel === 'index.html'
    ? 'index.html'
    : rel.replace(/\.html$/, '/index.html');

  const depth = outPath.split('/').length - 1;
  const base = '../'.repeat(depth);
  const home = depth === 0 ? '' : base + 'index.html';

  let html = readFileSync(srcFile, 'utf8');
  html = html.replace(/<!--\s*include:([\w-]+)\s*-->/g, (_, name) => {
    if (!(name in partials)) {
      throw new Error(`build:html — unknown partial "${name}" in ${srcFile}`);
    }
    return partials[name];
  });
  html = html.split('{{home}}').join(home);
  html = html.split('{{base}}').join(base);

  mkdirSync(dirname(outPath) || '.', { recursive: true });
  writeFileSync(outPath, html);
  console.log(`build:html — ${srcFile} -> ${outPath}`);
}

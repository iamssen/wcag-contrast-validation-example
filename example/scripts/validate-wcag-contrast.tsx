import { analyzeWCAGContrast } from '@app/anlayze-wcag-contrast';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { dark } from 'style/theme';

const store: string = path.resolve(process.cwd(), 'snapshots/wcag-contrast');
const previewJson: string = path.join(store, 'preview.json');
const previewSvg: string = path.join(store, 'preview.svg');

const { background, primary, secondary } = dark.palette;

const { scores, svg } = analyzeWCAGContrast(background, [primary, secondary]);

const nextScores: string = JSON.stringify({ scores, preview: 'preview.svg' });
const prevScores: string | undefined = fs.existsSync(previewJson) ? fs.readFileSync(previewJson, 'utf8') : undefined;

if (!prevScores || nextScores !== prevScores) {
  fs.mkdirpSync(store);
  fs.writeFileSync(previewSvg, renderToString(svg), 'utf8');
  fs.writeFileSync(previewJson, JSON.stringify({
    scores,
    preview: 'preview.svg',
  }), 'utf8');
  
  execSync(`git add ${previewJson} ${previewSvg}`);
}

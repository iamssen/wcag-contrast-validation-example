import { context } from '@actions/github';
import { compareWCAGContrastScores } from '@ssen/anlayze-wcag-contrast';
import { issueComment } from 'create-github-comment';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { renderToString } from 'react-dom/server';

(async () => {
  const githubToken = process.env.GITHUB_TOKEN;
  const owner = context.payload.repository?.owner?.name;
  const repo = context.payload.repository?.name;
  const issue_number: number | undefined = context.payload.pull_request?.number;
  const commit_sha = context.sha;
  
  console.log('validate-pull-request.ts..()', {
    owner,
    repo,
    issue_number,
    commit_sha,
  });

  if (!githubToken) {
    console.error(`Undefined GITHUB_TOKEN`);
    process.exit(1);
  } else if (
    !owner ||
    !repo ||
    !commit_sha ||
    typeof issue_number !== 'number'
  ) {
    console.error(`Only run this script on github action of master commit`);
    process.exit(1);
  }

  try {
    const { scores: base } = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/master/example/snapshots/wcag-contrast/preview.json`,
    ).then((res) => res.json());

    const { scores: change } = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'snapshots/wcag-contrast/preview.json'),
        'utf8',
      ),
    );

    const { element, changed } = await compareWCAGContrastScores(base, change);

    const elementString = renderToString(element);

    const image: string = changed
      ? `<img src="https://raw.githubusercontent.com/${owner}/${repo}/${commit_sha}/example/snapshots/wcag-contrast/preview.svg"/>`
      : `<details><summary>Score</summary><img src="https://raw.githubusercontent.com/${owner}/${repo}/${commit_sha}/example/snapshots/wcag-contrast/preview.svg"/></details>`;

    await issueComment({
      githubToken,
      owner,
      repo,
      issue_number,
      stickyComment: `# WCAG CONTRAST RATIO`,
      body: `${elementString}\n\n${image}`,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

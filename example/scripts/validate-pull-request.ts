import { context } from '@actions/github';
import { compareWCAGContrastScores } from '@ssen/anlayze-wcag-contrast';
import { issueComment } from 'create-github-comment';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { renderToString } from 'react-dom/server';

(async () => {
  const githubToken: string | undefined = process.env.GITHUB_TOKEN;
  const base_owner: string | undefined =
    context.payload.pull_request?.base?.repo?.owner?.login;
  const base_sha: string | undefined =
    context.payload.pull_request?.base?.repo?.sha;
  const send_owner: string = context.actor;
  const send_sha: string = context.sha;
  const repo: string | undefined =
    context.payload.pull_request?.base?.repo?.name;
  const issue_number: number | undefined = context.payload.pull_request?.number;

  if (!githubToken) {
    console.error(`Undefined GITHUB_TOKEN`);
    process.exit(1);
  } else if (
    !base_owner ||
    !base_sha ||
    !send_owner ||
    !send_sha ||
    !repo ||
    typeof issue_number !== 'number'
  ) {
    console.error(`Only run this script on github action of pull request`, {
      base_owner,
      base_sha,
      send_owner,
      send_sha,
      repo,
      issue_number,
    });
    process.exit(1);
  }

  try {
    const { scores: base } = await fetch(
      `https://raw.githubusercontent.com/${base_owner}/${repo}/${base_sha}/example/snapshots/wcag-contrast/preview.json`,
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
      ? `<img src="https://raw.githubusercontent.com/${send_owner}/${repo}/${send_sha}/example/snapshots/wcag-contrast/preview.svg"/>`
      : `<details><summary>Score</summary><img src="https://raw.githubusercontent.com/${send_owner}/${repo}/${send_sha}/example/snapshots/wcag-contrast/preview.svg"/></details>`;

    await issueComment({
      githubToken,
      owner: base_owner,
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

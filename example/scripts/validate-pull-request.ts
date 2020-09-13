// https://raw.githubusercontent.com/iamssen/wcag-contrast-validation-example/master/example/snapshots/wcag-contrast/preview.json
import { context } from '@actions/github';
import { commitComment, issueComment } from 'create-github-comment';
import fetch from 'node-fetch';

(async () => {
  const githubToken = process.env.GITHUB_TOKEN;
  const owner = context.payload.repository?.owner?.name;
  const repo = context.payload.repository?.name;
  const issue_number: number | undefined = context.payload.pull_request?.number;
  const commit_sha = context.sha;
  
  if (!githubToken) {
    throw new Error(`Undefined GITHUB_TOKEN`);
  } else if (!owner || !repo || !commit_sha || typeof issue_number !== 'number') {
    throw new Error(`Only run this script on github action of master commit`);
  }
  
  // FIXME github does not support <img src="data-uri" />
  //const { background, primary, secondary, error, warning, info, success } = dark.palette;
  //
  //const { svg } = analyzeWCAGContrast({
  //  backgroundColor: background.default,
  //  paperColor: background.paper,
  //  colors: {
  //    primary: primary.main,
  //    secondary: secondary.main,
  //    error: error.main,
  //    warning: warning.main,
  //    info: info.main,
  //    success: success.main,
  //  },
  //});
  //
  //const image: string = svgToMiniDataURI(renderToString(svg));
  
  //await issueComment({
  //  githubToken,
  //  owner,
  //  repo,
  //  commit_sha,
  //  stickyComment: `# WCAG CONTRAST RATIO`,
  //  body: `<img src="https://raw.githubusercontent.com/${owner}/${repo}/${commit_sha}/example/snapshots/wcag-contrast/preview.svg"/>`,
  //});
})();
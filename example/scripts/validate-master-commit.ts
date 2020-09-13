import { context } from '@actions/github';
import { analyzeWCAGContrast } from '@ssen/anlayze-wcag-contrast';
import { commitComment } from 'create-github-comment';
import svgToMiniDataURI from 'mini-svg-data-uri';
import { renderToString } from 'react-dom/server';
import { dark } from 'style/theme';

(async () => {
  const githubToken = process.env.GITHUB_TOKEN;
  const owner = context.payload.repository?.owner?.name;
  const repo = context.payload.repository?.name;
  const commit_sha = context.sha;
  
  if (!githubToken) {
    throw new Error(`Undefined GITHUB_TOKEN`);
  } else if (!owner || !repo || !commit_sha) {
    throw new Error(`Only run this script on github action of master commit`);
  }
  
  const { background, primary, secondary, error, warning, info, success } = dark.palette;
  
  const { svg } = analyzeWCAGContrast({
    backgroundColor: background.default,
    paperColor: background.paper,
    colors: {
      primary: primary.main,
      secondary: secondary.main,
      error: error.main,
      warning: warning.main,
      info: info.main,
      success: success.main,
    },
  });
  
  const image: string = svgToMiniDataURI(renderToString(svg));
  
  await commitComment({
    githubToken,
    owner,
    repo,
    commit_sha,
    stickyComment: `# WCAG CONTRAST RATIO`,
    body: `<img src="${image}"/>`,
  });
})();
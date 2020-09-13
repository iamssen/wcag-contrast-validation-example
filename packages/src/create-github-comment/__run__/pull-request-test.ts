import { issueComment } from 'create-github-comment/issueComment';

(async () => {
  // ---------------------------------------------
  // issue
  // ---------------------------------------------
  await issueComment({
    githubToken: process.env.GITHUB_TOKEN ?? '',
    owner: 'iamssen',
    repo: 'wcag-contrast-validation-example',
    issue_number: 1,
    stickyComment: `> [COMMENT BOT] DO NOT EDIT THIS COMMENT MANUALLY\n`,
    body: `random: ${Math.floor(Math.random() * 1000)}`,
  });
  
  // ---------------------------------------------
  // commit
  // ---------------------------------------------
  //await commitComment({
  //  githubToken: process.env.GITHUB_TOKEN ?? '',
  //  owner: 'iamssen',
  //  repo: 'wcag-contrast-validation-example',
  //  commit_sha: '3986eb77d5821df48b398a67f9d1322219500224',
  //  stickyComment: `> [COMMENT BOT] DO NOT EDIT THIS COMMENT MANUALLY\n`,
  //  body: `random: ${Math.floor(Math.random() * 1000)}`,
  //});
})();
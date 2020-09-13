# `create-github-comment`

```ts
import {
  commitComment, 
  issueComment,  
  pullRequestComment, 
} from 'create-github-comment'

await commitComment({
  githubToken: 'string' ?? process.env.GITHUB_TOKEN,
  owner: 'string',
  repo: 'string',
  commit_sha: 'string',
  sticky: 'string' ?? undefined,
  body: 'string',
})

await issueComment({
  githubToken: 'string' ?? process.env.GITHUB_TOKEN,
  owner: 'string',
  repo: 'string',
  issue_number: 1,
  sticky: 'string' ?? undefined,
  body: 'string',
})

await pullRequestComment({
  githubToken: 'string' ?? process.env.GITHUB_TOKEN,
  owner: 'string',
  repo: 'string',
  issue_number: 1,
  sticky: 'string' ?? undefined,
  body: 'string',
})
```
import { Octokit } from '@octokit/rest';

export interface IssueCommentParams {
  githubToken: string;
  owner: string;
  repo: string;
  issue_number: number;
  stickyComment?: string;
  body: string;
}

export async function issueComment({
                                     githubToken,
                                     owner,
                                     repo,
                                     issue_number,
                                     stickyComment,
                                     body,
                                   }: IssueCommentParams) {
  const octokit = new Octokit({
    auth: githubToken,
  });
  
  if (typeof stickyComment === 'string') {
    const comments = await octokit.issues.listComments({
      owner,
      repo,
      issue_number,
    });
    
    const prevComment = comments.data.find(comment => comment.body.indexOf(stickyComment) === 0);
    
    if (prevComment) {
      await octokit.issues.updateComment({
        owner,
        repo,
        issue_number,
        comment_id: prevComment.id,
        body: `${stickyComment}\n${body}`,
      });
    } else {
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number,
        body: `${stickyComment}\n${body}`,
      });
    }
  } else {
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number,
      body,
    });
  }
}
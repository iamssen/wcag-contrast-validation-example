import { Octokit } from '@octokit/rest';

export interface CommitCommentParams {
  githubToken: string;
  owner: string;
  repo: string;
  commit_sha: string;
  stickyComment?: string;
  body: string;
}

export async function commitComment({
  githubToken,
  owner,
  repo,
  commit_sha,
  stickyComment,
  body,
}: CommitCommentParams) {
  const octokit = new Octokit({
    auth: githubToken,
  });

  if (typeof stickyComment === 'string') {
    const comments = await octokit.repos.listCommentsForCommit({
      owner,
      repo,
      commit_sha,
    });

    const prevComment = comments.data.find(
      (comment) => comment.body.indexOf(stickyComment) === 0,
    );

    if (prevComment) {
      await octokit.repos.updateCommitComment({
        owner,
        repo,
        commit_sha,
        comment_id: prevComment.id,
        body: `${stickyComment}\n${body}`,
      });
    } else {
      await octokit.repos.createCommitComment({
        owner,
        repo,
        commit_sha,
        body: `${stickyComment}\n${body}`,
      });
    }
  } else {
    await octokit.repos.createCommitComment({
      owner,
      repo,
      commit_sha,
      body,
    });
  }
}

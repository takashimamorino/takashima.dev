import { Octokit } from '@octokit/core';
import { gists } from '../../contents/gist';
import { GITHUB_AUTH_TOKEN } from 'constants/env';
import { type Gist, type Record } from 'types/record';

const octokit = new Octokit({ auth: GITHUB_AUTH_TOKEN });

export const getRecord = async () => {
  const res: Record[] = await Promise.all(
    gists.map(async (gist) => {
      const res: Gist = await octokit.request(`GET /gists/${gist.id}`, {});
      return {
        link: res.data.html_url,
        title: res.data.description,
      };
    })
  );
  return res;
};

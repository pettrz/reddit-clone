import parser from 'html-react-parser';
import * as _ from 'lodash';
import React, { useCallback, useEffect } from 'react';
import Markdown from 'react-markdown';
import Layout from '../../components/Layout';
import './Comments.scss';
import Reply from './Reply/Reply';
const decode = require('decode-html');

interface IComments {
  location?: any;
  fetchPostComments: (path: any) => void;
  postComments: [];
  clearComments: () => void;
}
export const Comments = ({
  location,
  fetchPostComments,
  postComments,
  clearComments,
}: IComments) => {
  const post = _.get(postComments, 'post', []);
  const comments = _.get(postComments, 'comments', []);
  const embed = _.get(post, 'secure_media_embed', '');

  const getPostComments = useCallback(
    (path: string) => {
      fetchPostComments({ path });
    },
    [fetchPostComments],
  );

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getPostComments(location.pathname);
    }

    return () => {
      // componentWillUnmount
      ignore = true;
      clearComments();
    };
  }, [getPostComments, location.pathname, clearComments]);

  return (
    <Layout pagination={false}>
      <div className="showcase">
        <div className="showcase__header">
          <h3>{post.title}</h3>
        </div>
        <div className="showcase__selftext">
          <div className="showcase__selftext__body">
            <Markdown source={post.selftext} />
            {embed && parser(decode(embed.content))}
          </div>
        </div>
      </div>

      <div className="comments">
        <div className="comments__header">
          <h5>{post.num_comments || 'No'} Comments</h5>
        </div>
        {comments.map((c: any) => (
          <Reply key={c.data.id} data={c.data} />
        ))}
      </div>
    </Layout>
  );
};

export default Comments;

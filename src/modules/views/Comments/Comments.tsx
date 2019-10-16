import * as _ from 'lodash';
import React, { useCallback, useEffect } from 'react';
import Markdown from 'react-markdown';
import Layout from '../../components/Layout';
import './Comments.scss';
import Reply from './Reply/Reply';
interface IComments {
  location?: any;
  fetchPostComments: (path: any) => void;
  postComments: [];
}
export const Comments = ({
  location,
  fetchPostComments,
  postComments,
}: IComments) => {
  const post = _.get(postComments, 'post', []);
  const comments = _.get(postComments, 'comments', []);

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
      ignore = true;
    };
  }, [getPostComments, location.pathname]);

  return (
    <Layout pagination={false}>
      <div className="showcase">
        <div className="showcase__header">
          <h3>{post.title}</h3>
        </div>
        <div className="showcase__selftext">
          <div className="showcase__selftext__body">
            <Markdown source={post.selftext} />
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

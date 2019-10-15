import * as _ from 'lodash';
import React from 'react';
import Markdown from 'react-markdown';
import Layout from '../../components/Layout';
import './Comments.scss';
interface IComment {
  location?: any;
}
export const Comments = ({ location }: IComment) => {
  const postData = _.get(location.state, 'data.data', []);
  const title = _.get(postData, 'title', '');
  // const thumbnail = _.get(data.data, 'thumbnail', '');
  // const created = _.get(data.data, 'created', 0);
  // const score = _.get(data.data, 'score', 0);
  const numComments = _.get(postData, 'num_comments', 0);
  // const creationDate = new Date(created * 1000).toISOString();
  const selfText = _.get(postData, 'selftext', '');
  // const author = _.get(data.data, 'author', '');

  console.log(postData);
  return (
    <Layout pagination={false}>
      <div className='showcase'>
        <div className='showcase__header'>
          <h3>{title}</h3>
        </div>
        <div className="showcase__selftext">
          <div className="showcase__selftext__body">
            <Markdown source={selfText} />
          </div>
        </div>
      </div>

      <div className='comments'>
        <div className='comments__header'>
          <h5>{numComments || 'No'} Comments</h5>
        </div>
      </div>
    </Layout>
  );
};

export default Comments;

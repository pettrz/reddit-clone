import _ from 'lodash';
import React from 'react';
import './Post.scss';

const Post = ({ data }: any) => {
  console.log(data);
  const title = _.get(data.data, 'title', '');
  const thumbnail = _.get(data.data, 'thumbnail', '');
  const created =  _.get(data.data, 'created', 0);
  const creationDate = new Date(created * 1000).toDateString()
  const author = _.get(data.data, 'author', '');
  console.log(created);
  return (
    <div className="post row">
      <div className='post__date-posted'>
        {creationDate}
      </div>
      <div className="post__thumbnail">
        <img src={thumbnail} alt="" />
      </div>
      <div className="post__body">
        <h5>{title}</h5>
        <div className="post__body__author">
          Submitted by {author}
        </div>
      </div>
    </div>
  );
};

export default Post;

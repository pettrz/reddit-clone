import _ from 'lodash';
import React from 'react';
import './Post.scss';

const Post = ({ data }: any) => {
  console.log(data);
  const title = _.get(data.data, 'title', null);
  const thumbnail = _.get(data.data, 'thumbnail', '');
  // const created = _.get(data.data, 'created', null);
  // const author = _.get(data.data, 'author', null);
  return (
    <div className="post row">
      <div className="post__thumbnail"><img src={thumbnail} alt=""/></div>
      <h5>{title}</h5>
    </div>
  );
};

export default Post;

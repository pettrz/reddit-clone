import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import 'moment-timezone';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './Post.scss';

const Post = ({ data }: any) => {
  const [selftextExpand, setSelftextExpand] = useState(false);
  const title = _.get(data.data, 'title', '');
  const thumbnail = _.get(data.data, 'thumbnail', '');
  const thumbnailDisplay =
    thumbnail === 'default'
      ? 'https://via.placeholder.com/150'
      : thumbnail === 'self'
      ? 'https://via.placeholder.com/150'
      : thumbnail;
  const created = _.get(data.data, 'created', 0);
  const score = _.get(data.data, 'score', 0);
  const numComments = _.get(data.data, 'num_comments', 0);
  const creationDate = new Date(created * 1000).toISOString();
  const selfText = _.get(data.data, 'selftext', '');
  const author = _.get(data.data, 'author', '');
  const permaLink = _.get(data.data, 'permalink', '');

  const toggleSelftext = () => {
    const selftextState = selftextExpand ? false : true;
    setSelftextExpand(selftextState);
  };
  return (
    <div className="post-wrapper">
      <div className="post row">
        <div className="post__score">
          <div className="post__score__points">{score}</div>
        </div>
        <div className="post__container row">
          <div className="post__container__date-posted">
            <Moment
              date={creationDate}
              fromNow={true}
              locale="sv"
              tz="Europe/Stockholm"
            />
          </div>
          <Link to={permaLink} className="post__container__thumbnail">
            <img height="80" width="80" src={thumbnailDisplay} alt="" />
          </Link>
          <div className="post__container__body">
            <div className="post__container__body__upper">
              <Link to={permaLink}>{title}</Link>
              <div className="post__container__body__upper__author">
                Submitted by {author}
              </div>
            </div>
            <div className="post__container__body__lower">
              <button
                className="post__container__body__lower__btn"
                onClick={toggleSelftext}
              >
                <FontAwesomeIcon
                  title="Toggle selftext"
                  icon="book-open"
                  size="sm"
                />
                <span>EXPAND</span>
              </button>
              <Link
                to={permaLink}
                className="post__container__body__lower__btn"
              >
                <FontAwesomeIcon
                  title="Toggle selftext"
                  icon="comment"
                  flip="horizontal"
                  size="sm"
                />
                <span>{numComments} Comments</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {selftextExpand && (
        <div className="selftext">
          {selfText && (
            <>
              <div className="selftext__title">
                <h1>
                  <i>{author} says...</i>
                </h1>
              </div>
              <div className="selftext__body">
                <Markdown source={selfText} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;

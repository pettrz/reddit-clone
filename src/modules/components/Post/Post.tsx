import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';
import _ from 'lodash';
import 'moment-timezone';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './Post.scss';
const decode = require('unescape');

interface IPost {
  data: any;
}

const Post = ({ data }: IPost) => {
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
  const selftext = _.get(data.data, 'selftext', '');
  const isSelf = _.get(data.data, 'is_self', false);
  const url = _.get(data.data, 'url', '');
  const author = _.get(data.data, 'author', '');
  const permaLink = _.get(data.data, 'permalink', '');
  const embed = _.get(data.data, 'secure_media_embed', '');
  const decodedEmbed = parse(decode(embed.content));

  const toggleSelftext = () => {
    const selftextState = selftextExpand ? false : true;
    setSelftextExpand(selftextState);
  };

  const convertScore = (value: number) =>
    value >= 1000 ? (value / 1000).toFixed(1) + 'K' : value;
  const voteAlert = () => alert('This feature will be added later on!');

  return (
    <div className="post-wrapper">
      <div className="post row">
        <div className="post__score">
          <span onClick={voteAlert}>
            <FontAwesomeIcon icon="angle-up" size="lg" />
          </span>
          <div className="post__score__points">{convertScore(score)}</div>
          <span onClick={voteAlert}>
            <FontAwesomeIcon icon="angle-down" size="lg" />
          </span>
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
            <img
              height="80"
              width="80"
              src={thumbnailDisplay}
              alt="Thumbnail for the post"
            />
          </Link>
          <div className="post__container__body">
            <div className="post__container__body__upper">
              <Link to={permaLink}>{title}</Link>
              <div className="post__container__body__upper__author">
                Submitted by {author}
              </div>
            </div>
            <div className="post__container__body__lower">
              {isSelf ? (
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
              ) : (
                <a
                  className="post__container__body__lower__btn"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon title="Open link" icon="link" size="sm" />
                  <span>Open link</span>
                </a>
              )}
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
      {selftextExpand && isSelf && (
        <div className="selftext">
          {selftext && (
            <div className="selftext__title">
              <h2>
                <i>{author} says...</i>
              </h2>
            </div>
          )}
          <div className="selftext__body">
            {selftext && <Markdown source={selftext} />}
            {embed && decodedEmbed}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

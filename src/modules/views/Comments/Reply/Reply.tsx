import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import _ from 'lodash';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import './Reply.scss';

interface IReply {
  data: any;
  offset?: number;
}

export const Reply = ({ data, offset = 100 }: IReply) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const collapsedReply = () => setCollapsed(!collapsed);
  const collapsedIcon = collapsed ? 'plus-square' : 'minus-square';
  const collapsedTitle = collapsed ? 'Open reply' : 'Close reply';

  const childReply = _.get(data, 'replies.data.children[0].data', undefined);
  const replyClasses = cn('reply', { 'reply--collapsed': collapsed });
  return (
    <div className="reply-chain">
      <div className={replyClasses} style={{ width: offset + '%' }}>
        <div className="reply__header">
          <div className="reply__header__collapse">
            <span onClick={collapsedReply}>
              <FontAwesomeIcon icon={collapsedIcon} title={collapsedTitle} />
            </span>
          </div>
          <a
            href={`http://reddit.com/u/${data.author}`}
            target="_blank"
            title={`Visit ${data.author}'s profile`}
            rel="noopener noreferrer"
          >
            <h6>{data.author}</h6>
          </a>
        </div>
        <div className="reply__body">
          {!collapsed ? (
            <Markdown source={data.body} />
          ) : (
            <div className="reply__body__collapsed" onClick={collapsedReply}>
              Click here to expand
            </div>
          )}
        </div>
      </div>
      {childReply && !collapsed && (
        <Reply data={childReply} offset={offset - 10} />
      )}
    </div>
  );
};

export default Reply;

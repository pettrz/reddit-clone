import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import './Reply.scss';

interface IReply {
  data: any;
}

export const Reply = ({ data }: IReply) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const collapsedReply = () => setCollapsed(!collapsed);
  const collapsedIcon = collapsed ? 'plus-square' : 'minus-square';
  const collapsedTitle = collapsed ? 'Open reply' : 'Close reply';

  return (
    <div className={cn("reply", { "reply--collapsed": collapsed })}>
      <div className="reply__header">
        <div className="reply__header__collapse">
          <span onClick={collapsedReply}>
            <FontAwesomeIcon icon={collapsedIcon} title={collapsedTitle}/>
          </span>
        </div>
        <a href={`http://reddit.com/u/${data.author}`} target="_blank" title={`Visit ${data.author}'s profile`} rel="noopener noreferrer">
          <h6>{data.author}</h6>
        </a>
      </div>
      <div className="reply__body">
        { !collapsed 
          ? <Markdown source={data.body} /> 
          : <div className="reply__body__collapsed" onClick={collapsedReply}>
              Click here to expand
            </div>
        }
      </div>
    </div>
  );
};

export default Reply;

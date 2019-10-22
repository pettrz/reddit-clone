import * as _ from 'lodash';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import './Header.scss';

interface IHeaderProps {
  limitHandler: (e: any) => void;
  subredditHandler: (name: any) => void;
  history: any;
  subreddit: any;
}
const Header = ({ limitHandler, history, subreddit }: IHeaderProps) => {
  const currentSub = _.get(subreddit, 'currentSub', '');
  const [limit, setLimit] = useState<number>(10);
  const [visitSub, setVisitSub] = useState<string>(currentSub);

  const onChangeSubreddit = (e: any) => {
    setVisitSub(e.target.value);
    return;
  };
  const onSubmitSubreddit = (e: any) => {
    e.preventDefault();
    const pathname = `/r/${visitSub}`;
    history.push({
      pathname
    });
  };

  const LimitHandler = (e: any) => {
    setLimit(e.target.value);
    limitHandler(e);
  };
  console.log(subreddit)
  return (
    <header className="main-header points-offset">
      <div className="main-header__title">
        <Link to={currentSub}>
          <h2>{currentSub}</h2>
        </Link>
      </div>
      <div className="main-header__options">
        <form onSubmit={onSubmitSubreddit}>
          <input
            id="subreddit"
            className="main-header__options__input"
            placeholder="Search subreddit"
            onChange={onChangeSubreddit}
          />
        </form>
        {[5, 10, 25].map((v: number, i: any) => (
          <Button
            key={v + i}
            value={v}
            selected={v === limit}
            onClick={LimitHandler}
            title={`Limit to ${v}`}
          >
            {v}
          </Button>
        ))}
      </div>
    </header>
  );
};

export default Header;

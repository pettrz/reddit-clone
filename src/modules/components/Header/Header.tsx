import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import './Header.scss';

interface IHeaderProps {
  limitHandler: (e: any) => void;
  subredditHandler: (name: any) => void;
  history: any;
}
const Header = ({ limitHandler, history }: IHeaderProps) => {
  const [limit, setLimit] = useState(undefined);
  const [subreddit, setSubreddit] = useState(undefined);

  const onChangeSubreddit = (e: any) => {
    setSubreddit(e.target.value);
  };
  const onSubmitSubreddit = (e: any) => {
    e.preventDefault();
    const pathname = `/r/${subreddit}`;
    history.push({
      pathname,
    });
  };

  const LimitHandler = (e: any) => {
    console.log(e.target.value);
    setLimit(e.target.value);
    limitHandler(e);
  };
  return (
    <header className="main-header">
      <div className="main-header__title">
        <Link to="/">
          <h2>Reddit Clone</h2>
        </Link>
      </div>
      <div className="main-header__options">
        <form onSubmit={onSubmitSubreddit}>
          <input
            id="subreddit"
            placeholder="Enter subreddit"
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

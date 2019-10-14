import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import './Header.scss';

interface IHeaderProps {
  limitHandler: (e: any) => void;
  subredditHandler: (name: any) => void;
}
const Header = ({ limitHandler, subredditHandler }: IHeaderProps) => {
  const [limit, setLimit] = useState(undefined);
  const [subreddit, setSubreddit] = useState(undefined);

  const onChangeSubreddit = (e: any) => {
    setSubreddit(e.target.value);
  };
  const onSubmitSubreddit = (e: any) => {
    e.preventDefault();
    subredditHandler(subreddit);
  };

  const LimitHandler = (e: any) => {
    console.log(e.target.value);
    setLimit(e.target.value);
    limitHandler(e);
  };
  return (
    <header className="main-header">
      <div className="main-header__title">
        <Link to="/r/reactjs">
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
        {[5, 10, 25].map((v: number) => (
          <Button
            key={v}
            value={v}
            selected={v === limit}
            onClick={LimitHandler}
          >
            {v}
          </Button>
        ))}
      </div>
    </header>
  );
};

export default Header;

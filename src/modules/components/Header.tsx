import cn from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    console.log(subreddit);
    subredditHandler(subreddit);
  };

  const privateLimitHandler = (e: any) => { 
    setLimit(e.target.value); 
    limitHandler(e);
  };

  return (
    <header className="main-header">
      <div className="main-header__title">
        <Link to="/r/reactjs">
          <h1>Reddit Clone</h1>
        </Link>
      </div>
      <div className="main-header__options">
        <form onSubmit={onSubmitSubreddit}>
          <input 
            id='subreddit'
            placeholder='Enter subreddit'
            onChange={onChangeSubreddit}
          />
          <button type="button">Submit</button>
        </form>
        <button
          className={cn('main-header__options__btn', {['btn--selected']: limit === '5' })}
          value="5"
          onClick={privateLimitHandler}
        >
          5
        </button>
        <button
          className={cn('main-header__options__btn', {['btn--selected']: limit === '10' })}
          value="10"
          onClick={privateLimitHandler}
        >
          10
        </button>
        <button
          className={cn('main-header__options__btn', {['btn--selected']: limit === '25' })}
          value="25"
          onClick={privateLimitHandler}
        >
          25
        </button>
      </div>
    </header>
  );
};

export default Header;

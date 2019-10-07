import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

interface IHeaderProps {
  countHandler: (e: any) => void;
}
const Header = ({ countHandler }: IHeaderProps) => {
  return (
    <header className="main-header">
      <div className="main-header__title">
        <Link to="/r/reactjs">
          <h1>Reddit Clone</h1>
        </Link>
      </div>
      <div className="main-header__options">
        <button
          className="main-header__options__btn"
          value="25"
          onClick={countHandler}
        >
          25
        </button>
        <button
          className="main-header__options__btn"
          value="50"
          onClick={countHandler}
        >
          50
        </button>
        <button
          className="main-header__options__btn"
          value="75"
          onClick={countHandler}
        >
          75
        </button>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import './Header.scss';

const Header = ({ countHandler }: { countHandler: (e: any) => void }) => {
  return (
    <header className='main-header'>
      <div className='main-header__menu'>
        <h1>Reddit Clone</h1>
      </div>
      <div className='main-header__options'>
        <button value="25" onClick={countHandler}>25</button>
        <button value="50" onClick={countHandler}>50</button>
        <button value="75" onClick={countHandler}>75</button>
      </div>
    </header>
  );
};

export default Header;

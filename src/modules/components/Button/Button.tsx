import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

interface IButtonGlobalProps {
  children: React.ReactNode;
  type?: 'home' | 'limit' | 'pagination';
}

interface IButtonProps {
  value?: number | string;
  selected?: boolean;
  onClick: (e: any) => void;
}

interface IButtonLinkProps {
  to: string;
}

const Button = ({
  children,
  type,
  value,
  selected,
  onClick,
}: IButtonProps & IButtonGlobalProps) => {
  const BtnClasses = cn(
    'btn',
    { ['btn--' + type]: type },
    { 'btn--selected': selected },
  );
  return (
    <button className={BtnClasses} value={value} onClick={onClick}>
      {children}
    </button>
  );
};

const ButtonLink = ({
  children,
  to,
  type,
}: IButtonLinkProps & IButtonGlobalProps) => {
  const BtnClasses = cn('btn', { ['btn--' + type]: type });
  return (
    <Link to={to} className={BtnClasses}>
      {children}
    </Link>
  );
};

export { Button, ButtonLink };

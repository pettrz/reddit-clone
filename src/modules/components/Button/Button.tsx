import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

interface IButtonGlobalProps {
  children: React.ReactNode;
  type?: 'home' | 'limit' | 'pagination';
  title?: string; 
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
  title,
  selected,
  onClick,
}: IButtonProps & IButtonGlobalProps) => {
  const BtnClasses = cn(
    'btn',
    { ['btn--' + type]: type },
    { 'btn--selected': selected },
  );
  return (
    <button className={BtnClasses} value={value} onClick={onClick} title={title}>
      {children}
    </button>
  );
};

const ButtonLink = ({
  children,
  to,
  type,
  title,
}: IButtonLinkProps & IButtonGlobalProps) => {
  const BtnClasses = cn('btn', { ['btn--' + type]: type });
  return (
    <Link to={to} className={BtnClasses} title={title}>
      {children}
    </Link>
  );
};

export { Button, ButtonLink };

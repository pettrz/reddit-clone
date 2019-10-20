import React from 'react';
import { ButtonLink } from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';
import './404.scss';

export const NoMatchText = () => {
  return (
    <div className="subreddit-error">
      <h3>404. Something went wrong :(</h3>
      <p>Page is most likely invalid</p>
      <ButtonLink to="/r/reactjs" type="home">
        Go home
      </ButtonLink>
    </div>
  );
};

export const NoMatch = () => {
  return (
    <Layout pagination={false}>
      <NoMatchText />
    </Layout>
  );
};

import React from 'react';
import { ButtonLink } from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';
import './404.scss';
export const NoMatch = () => (
  <Layout pagination={false}>
    <div className="subreddit-error">
      <h3>404. Something went wrong :(</h3>
      <p>Page is most likely invalid</p>
      <ButtonLink to="/" type="home">
        Go home
      </ButtonLink>
    </div>
  </Layout>
);

export default NoMatch;

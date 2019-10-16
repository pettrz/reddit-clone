import * as _ from 'lodash';
import qs from 'query-string';
import React, { useState } from 'react';
import { getParamsFromUrl } from '../../../helpers/getParams';
import { ButtonLink } from '../Button/Button';
import Header from '../Header';
import './Layout.scss';

interface ILayoutProps {
  children: React.ReactNode;
  history?: any;
  location?: any;
  subreddit?: [] | undefined;
  pagination?: boolean;
}

export const Layout = ({
  subreddit,
  children,
  history,
  location,
  pagination = true,
}: ILayoutProps) => {
  const [limit, setLimit] = useState<number>(25);
  const after = _.get(subreddit, 'postData.after', '');
  const before = _.get(subreddit, 'postData.before', '');
  const search = _.get(location, 'search', '');

  const searchParams = getParamsFromUrl(search);
  const pathname = _.get(location, 'pathame', '');

  const count = Number(_.get(searchParams, 'count', 0));
  const prevCount = count - +limit || 25;
  const nextCount = count + +limit;

  const limitHandler = (e: any) => {
    const { value } = e.target;
    setLimit(value);
    history.push({
      pathname: location.pathname,
      search: qs.stringify({ ...searchParams, limit: value }),
    });
  };

  const beforeLink =
    location &&
    `${pathname}?` +
      qs.stringify(
        {
          count: prevCount,
          before,
          after: undefined,
          limit,
        },
        { sort: false },
      );
  const afterLink =
    `${pathname}?` +
    qs.stringify(
      {
        count: nextCount,
        before: undefined,
        after,
        limit,
      },
      { sort: false },
    );
  return (
    <div className="wrapper">
      <Header limitHandler={limitHandler} />
      <main>
        {children}

        {pagination && (
          <div className="wrapper__pagination">
            {before && (
              <ButtonLink type="pagination" to={beforeLink}>
                Prev
              </ButtonLink>
            )}
            {after && (
              <ButtonLink type="pagination" to={afterLink}>
                Next
              </ButtonLink>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Layout;

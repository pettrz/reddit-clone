import * as _ from 'lodash';
import qs from 'query-string';
import React, {  useState } from 'react';
import { getParamsFromUrl } from '../../../helpers/getParams';
import { ButtonLink } from '../Button/Button';
import Header from '../Header';
interface ILayoutProps {
  // url: { sub: string, params: {}};
  // subredditHandler: any;
  children: React.ReactNode;
  history?: any;
  location?: any;
  subreddit?: [] | undefined;
}


export const Layout = ({ subreddit, children, history, location }: ILayoutProps) => {

  const [limit, setLimit] = useState(undefined);
  const after = _.get(subreddit, 'postData.after', '');
  const before = _.get(subreddit, 'postData.before', '');
  const searchParams = getParamsFromUrl(location.search);

  const limitHandler = (e: any) => {
    const { value } = e.target;
    setLimit(value);
    history.push({
      pathname: 'location.pathname',
      search: qs.stringify({limit: value }),
    });
  };
  
  const beforeLink =
    `${location.pathname}?` +
    qs.stringify({
      ...searchParams,
      limit: limit || 25,
      after: undefined,
      before,
    });
  const afterLink =
    `${location.pathname}?` +
    qs.stringify({
      ...searchParams,
      limit: limit || 25,
      after,
      before: undefined,
    });
  return (
    <div className="wrapper">
      <Header limitHandler={limitHandler} />
      <main>
        {children}
        <div>
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
      </main>
    </div>
  );
  
};

export default Layout;

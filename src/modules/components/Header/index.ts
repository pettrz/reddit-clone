import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { fetchSubreddit } from '../../../redux/actions/subreddit';
import Header from './Header';

const mapDispatchToProps = { fetchSubreddit } as any;
const mapStateToProps = (state: any) => state as any;

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Header as any) as any;

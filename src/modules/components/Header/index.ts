import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  fetchPostComments,
  fetchSubreddit,
} from '../../../redux/actions/subreddit';
import Header from './Header';

const mapDispatchToProps = { fetchPostComments, fetchSubreddit } as any;
const mapStateToProps = (state: any) => state as any;

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Header as any) as any;

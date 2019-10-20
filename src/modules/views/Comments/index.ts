import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { clearComments, fetchPostComments } from '../../../redux/actions/subreddit';
import Comments from './Comments';

const mapDispatchToProps = { fetchPostComments, clearComments } as any;
const mapStateToProps = (state: any) => state as any;

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Comments) as any;

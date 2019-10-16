import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { fetchSubreddit } from '../../../redux/actions/subreddit';
import { Layout } from './Layout';

const mapDispatchToProps = { fetchSubreddit } as any;
const mapStateToProps = (state: any) => state as any;

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Layout as any) as any;

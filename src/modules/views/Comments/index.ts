import { connect } from 'react-redux';
import { fetchSubreddit } from '../../../redux/actions/subreddit';
import { Comments } from './Comments';

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { fetchSubreddit };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comments as any);

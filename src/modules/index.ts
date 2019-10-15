import { connect } from 'react-redux';
import { fetchSubreddit } from '../redux/actions/subreddit';
import { App } from './App';


const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { fetchSubreddit };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App as any);

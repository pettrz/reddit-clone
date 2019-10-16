import { connect } from 'react-redux';
import { fetchSubreddit } from '../redux/actions/subreddit';
import { App } from './App';
import './index.scss';

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { fetchSubreddit };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App as any);

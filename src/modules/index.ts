import { connect } from 'react-redux';
import { App } from './App';

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps) (App as any);
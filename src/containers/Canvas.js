import {connect} from 'react-redux';
import Canvas from '../components/Canvas';

const mapStateToProps = (state, ownProps) => ({
  error: state.error
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);

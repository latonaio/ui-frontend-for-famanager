import {connect} from 'react-redux';
import AnnotationRegister from '../views/AnnotationRegister';

const mapStateToProps = (state, ownProps) => ({
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  // registerPoint(imageId, rateCoordinates) {
  //   dispatch(registerPoint(imageId, rateCoordinates));
  // },
  // deletePoint(imageId, pointId) {
  //   dispatch(deletePoint(imageId, pointId));
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationRegister);

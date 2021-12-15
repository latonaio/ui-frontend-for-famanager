import {connect} from 'react-redux';
import {getVehicleByWorkID, getWork} from '../actions';
import {VehicleInfoArea} from "../components/VehicleInfoArea";

const mapStateToProps = (state, _) => ({
  ...state.video_capture,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  getVehicleByWorkID(workID) {
    dispatch(getVehicleByWorkID(workID));
  },
  getWork(workID) {
    dispatch(getWork(workID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleInfoArea);

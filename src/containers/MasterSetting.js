import {connect} from 'react-redux';
import {fetchVehicles, updateThreshold} from '../actions/master_setting.actions';
import MasterSetting from '../views/MasterSetting';

const mapStateToProps = (state, _) => ({
  rows: state.master_setting.rows,
  error: state.master_setting.error,
  isUpdating: state.master_setting.isUpdating,
});

const mapDispatchToProps = dispatch => ({
  fetchVehicles() {
    dispatch(fetchVehicles());
  },
  updateThreshold(vehicleID, positionThresholdLevel, probabilityThresholdLevel) {
    dispatch(updateThreshold(vehicleID, positionThresholdLevel, probabilityThresholdLevel));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterSetting);

import {connect} from 'react-redux';
import {
  captureProductionImage,
  endProductionRecording,
  fetchDeviceStates,
  getMatchingRate,
  setTemplatesToAll,
  startProductionRecording
} from '../actions';
import {fetchVehicles} from "../actions/master_setting.actions";
import ProductionStart from "../views/ProductionStart";
import {getRtspToWsPort, stopRtspToWs} from "../actions/shooting.actions";
import {getAllCamera} from "../actions/camera.actions";

const mapStateToProps = (state, _) => ({
  vehicles: state.master_setting.rows,
  isShooting: state.video_capture.isShooting,
  imageURL: state.video_capture.imageURL,
  imageID: state.video_capture.imageID,
  port: state.shooting.port,
  vehicle: state.video_capture.vehicle,
  device: state.video_capture.device,
  devices: state.video_capture.devices,
  work: state.video_capture.work,
  point: state.video_capture.point,
  matching: state.video_capture.matching,
  isAvailable: state.video_capture.isAvailable,
  cameras: state.camera.cameras,
  error: state.error,
  ...state.shooting,
});

const mapDispatchToProps = dispatch => ({
  startProductionRecording() {
    dispatch(startProductionRecording());
  },
  endProductionRecording() {
    dispatch(endProductionRecording());
  },
  captureImage(captureToken) {
    dispatch(captureProductionImage(captureToken));
  },
  fetchVehicles() {
    dispatch(fetchVehicles());
  },
  getRtspToWsPort(usageID) {
    dispatch(getRtspToWsPort(usageID, true));
  },
  stopRtspToWs() {
    dispatch(stopRtspToWs());
  },
  fetchDeviceStates() {
    dispatch(fetchDeviceStates());
  },
  setTemplatesToAll() {
    dispatch(setTemplatesToAll());
  },
  getMatchingRate(processNo) {
    dispatch(getMatchingRate(processNo));
  },
  getAllCamera() {
    dispatch(getAllCamera());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductionStart);

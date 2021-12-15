import {connect} from 'react-redux';
import {
  deletePoint,
  fetchPointsByWorkID,
  getImageByWorkID,
  getVehicleByWorkID,
  getWork,
  registerImage,
  registerPoint
} from '../actions';
import TemplateRegister from "../views/TemplateRegister";
import {getRtspToWsPort, stopRtspToWs} from "../actions/shooting.actions";
import {getCameraByUsageID} from "../actions/camera.actions";

const mapStateToProps = (state, _) => ({
  imageURL: state.video_capture.imageURL,
  imageID: state.video_capture.imageID,
  vehicles: state.master_setting.rows,
  port: state.shooting.port,
  vehicle: state.video_capture.vehicle,
  device: state.video_capture.device,
  work: state.video_capture.work,
  point: state.video_capture.point,
  camera: state.camera.camera,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  getImageByWorkID(workID) {
    dispatch(getImageByWorkID(workID));
  },
  registerImage(workID, dataURI) {
    dispatch(registerImage(workID, dataURI));
  },
  getRtspToWsPort(deviceID) {
    dispatch(getRtspToWsPort(deviceID, false));
  },
  stopRtspToWs() {
    dispatch(stopRtspToWs());
  },
  getVehicleByWorkID(workID) {
    dispatch(getVehicleByWorkID(workID));
  },
  getWork(workID) {
    dispatch(getWork(workID));
  },
  registerPoint(imageId, rateCoordinates) {
    dispatch(registerPoint(imageId, rateCoordinates));
  },
  deletePoint(imageId, pointId) {
    dispatch(deletePoint(imageId, pointId));
  },
  fetchPointsByWorkID(workID) {
    dispatch(fetchPointsByWorkID(workID));
  },
  getCameraByUsageID(usageID) {
    dispatch(getCameraByUsageID(usageID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TemplateRegister);

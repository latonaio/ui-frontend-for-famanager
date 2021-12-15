import {cameraConstants} from '../constants';
import {cameraService} from '../services/';

export const getCameraByUsageID = (usageID) => {
  return dispatch => {
    dispatch(getCameraByUsageIDRequest());

    cameraService.getCameraByUsageID(usageID)
      .then(
        data => {
          dispatch(getCameraByUsageIDSuccess(data));
        },
        error => {
          dispatch(getCameraByUsageIDFailure(error));
        }
      );
  };
};

const getCameraByUsageIDRequest = () => ({
  type: cameraConstants.GET_CAMERA_BY_USAGE_ID_REQUEST,
});
const getCameraByUsageIDSuccess = data => ({
  type: cameraConstants.GET_CAMERA_BY_USAGE_ID_SUCCESS,
  payload: data
});
const getCameraByUsageIDFailure = error => ({
  type: cameraConstants.GET_CAMERA_BY_USAGE_ID_FAILURE,
  error,
});

export const getAllCamera = () => {
  return dispatch => {
    dispatch(getAllCameraRequest());

    cameraService.getAllCamera()
      .then(
        data => {
          dispatch(getAllCameraSuccess(data));
        },
        error => {
          dispatch(getAllCameraFailure(error));
        }
      );
  };
};

const getAllCameraRequest = () => ({
  type: cameraConstants.GET_ALL_CAMERA_REQUEST,
});
const getAllCameraSuccess = data => ({
  type: cameraConstants.GET_ALL_CAMERA_SUCCESS,
  payload: data,
});
const getAllCameraFailure = error => ({
  type: cameraConstants.GET_ALL_CAMERA_FAILURE,
  error,
});

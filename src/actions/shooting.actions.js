import {shootingService} from '../services/';
import {shootingConstants} from "../constants";

export const getCurrentVehicle = (vehicleID) => {
  return dispatch => {
    dispatch(getCurrentVehicleRequest());

    shootingService.getCurrentVehicle(vehicleID)
      .then(
        data => {
          dispatch(getCurrentVehicleSuccess(data));
        },
        error => {
          dispatch(getCurrentVehicleFailure(error));
        }
      );
  };
};

const getCurrentVehicleRequest = () => ({
  type: shootingConstants.GET_CURRENT_VEHICLE_REQUEST,
});
const getCurrentVehicleSuccess = data => ({
  type: shootingConstants.GET_CURRENT_VEHICLE_SUCCESS,
  payload: data
});
const getCurrentVehicleFailure = error => ({
  type: shootingConstants.GET_CURRENT_VEHICLE_FAILURE,
  payload: error
});

export const getResult = (vehicleID) => {
  return dispatch => {
    dispatch(getResultRequest());

    shootingService.getResult(vehicleID)
      .then(
        data => {
          dispatch(getResultSuccess(data));
        },
        error => {
          dispatch(getResultFailure(error));
        }
      );
  };
};

const getResultRequest = () => ({
  type: shootingConstants.GET_RESULT_REQUEST,
});
const getResultSuccess = data => ({
  type: shootingConstants.GET_RESULT_SUCCESS,
  payload: data
});
const getResultFailure = error => ({
  type: shootingConstants.GET_RESULT_FAILURE,
  payload: error
});

export const getRtspToWsPort = (usageID, isProduction) => {
  return dispatch => {
    dispatch(getRtspToWsPortRequest());

    shootingService.getRtspToWsPort(usageID, isProduction)
      .then(
        data => {
          dispatch(getRtspToWsPortSuccess(data));
        },
        error => {
          dispatch(getRtspToWsPortFailure(error));
        }
      );
  };
};

const getRtspToWsPortRequest = () => ({
  type: shootingConstants.GET_RTSP_TO_WS_PORT_REQUEST,
});
const getRtspToWsPortSuccess = data => ({
  type: shootingConstants.GET_RTSP_TO_WS_PORT_SUCCESS,
  payload: data
});
const getRtspToWsPortFailure = error => ({
  type: shootingConstants.GET_RTSP_TO_WS_PORT_FAILURE,
  payload: error
});

export const stopRtspToWs = () => {
  return dispatch => {
    dispatch(stopRtspToWsRequest());

    shootingService.stopRtspToWs()
      .then(
        data => {
          dispatch(stopRtspToWsSuccess(data));
        },
        error => {
          dispatch(stopRtspToWsFailure(error));
        }
      );
  };
};

const stopRtspToWsRequest = () => ({
  type: shootingConstants.STOP_RTSP_TO_WS_REQUEST,
});
const stopRtspToWsSuccess = data => ({
  type: shootingConstants.STOP_RTSP_TO_WS_SUCCESS,
  payload: data
});
const stopRtspToWsFailure = error => ({
  type: shootingConstants.STOP_RTSP_TO_WS_FAILURE,
  payload: error
});
import {publicUrl} from '../config';
import {shootingConstants} from '../constants';

const NO_IMAGE = "/no_image.jpg";

const initialState = {
  currentVehicle: {
    vehicle_id: null,
    name: null,
    no: null,
  },
  image_path: NO_IMAGE,
  image_timestamp: null,

  work_name: null, // TODO 必要性の検討
  is_pass: false, // TODO 必要性の検討
  position_threshold_level: null, // TODO 必要性の検討
  probability_threshold_level: null, // TODO 必要性の検討

  port: null,

  error: null,
};

export function shooting(state = initialState, action) {
  if (action.type === shootingConstants.GET_CURRENT_VEHICLE_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === shootingConstants.GET_CURRENT_VEHICLE_SUCCESS) {
    let currentVehicle = state.currentVehicle;
    if (action.payload.length > 0) {
      currentVehicle = action.payload[0];
    }
    return {
      ...state,
      currentVehicle,
    };
  } else if (action.type === shootingConstants.GET_CURRENT_VEHICLE_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === shootingConstants.GET_RESULT_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === shootingConstants.GET_RESULT_SUCCESS) {
    const date = new Date();

    return {
      ...state,
      image_path: `${publicUrl}uploads/${action.payload.img_path}?timestamp=${date.getTime()}`,
      image_timestamp: action.payload.time_stamp,
      currentVehicle: {
        vehicle_id: action.payload.vehicle_id,
        name: action.payload.vehicle_name,
        no: action.payload.vehicle_no,
      },
      is_pass: action.payload.pass,
      position_threshold_level: action.payload.position_threshold_level,
      probability_threshold_level: action.payload.probability_threshold_level,
    };
  } else if (action.type === shootingConstants.GET_RESULT_FAILURE) {
    return {
      ...state,
      image_path: NO_IMAGE,
      error: action.error,
    };
  } else if (action.type === shootingConstants.GET_RTSP_TO_WS_PORT_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === shootingConstants.GET_RTSP_TO_WS_PORT_SUCCESS) {
    return {
      ...state,
      port: action.payload.port,
    };
  } else if (action.type === shootingConstants.GET_RTSP_TO_WS_PORT_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === shootingConstants.STOP_RTSP_TO_WS_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === shootingConstants.STOP_RTSP_TO_WS_SUCCESS) {
    return {
      ...state,
      port: null,
    };
  } else if (action.type === shootingConstants.STOP_RTSP_TO_WS_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else {
    return {
      ...state,
    };
  }
}

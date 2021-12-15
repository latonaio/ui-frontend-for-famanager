import {cameraConstants} from '../constants';

const initialState = {
  camera: {
    state: 0,
  },
  cameras: [],
  error: null,
};

export function camera(state = initialState, action) {
  if (action.type === cameraConstants.GET_CAMERA_BY_USAGE_ID_REQUEST) {
    return {
      ...state,
    }
  } else if (action.type === cameraConstants.GET_CAMERA_BY_USAGE_ID_SUCCESS) {
    return {
      ...state,
      camera: action.payload,
    }
  } else if (action.type === cameraConstants.GET_CAMERA_BY_USAGE_ID_FAILURE) {
    return {
      ...state,
      error: action.error,
    }
  } else if (action.type === cameraConstants.GET_ALL_CAMERA_REQUEST) {
    return {
      ...state,
    }
  } else if (action.type === cameraConstants.GET_ALL_CAMERA_SUCCESS) {
    return {
      ...state,
      cameras: action.payload,
    }
  } else if (action.type === cameraConstants.GET_ALL_CAMERA_FAILURE) {
    return {
      ...state,
      error: action.error,
    }
  } else {
    return {
      ...state,
    };
  }
}

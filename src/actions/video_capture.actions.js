import {videoCaptureConstants} from '../constants';
import {videoCaptureService} from '../services/';

export const getImageByWorkID = (workID) => {
  return dispatch => {
    dispatch(requestGetImageByWorkID());

    videoCaptureService.getImageByWorkID(workID)
      .then(
        data => {
          dispatch(successGetImageByWorkID(data));
        },
        error => {
          dispatch(failureGetImageByWorkID(error));
        }
      );
  };
};

const requestGetImageByWorkID = () => ({
  type: videoCaptureConstants.GET_IMAGE_BY_WORK_ID_REQUEST
});
const successGetImageByWorkID = data => ({
  type: videoCaptureConstants.GET_IMAGE_BY_WORK_ID_SUCCESS,
  payload: data
});
const failureGetImageByWorkID = error => ({
  type: videoCaptureConstants.GET_IMAGE_BY_WORK_ID_FAILURE,
  payload: error
});

export const registerImage = (workID, blob) => {
  return dispatch => {
    dispatch(registerImageRequest());

    videoCaptureService.registerImage(workID, blob)
      .then(
        data => {
          dispatch(registerImageSuccess(data));
        },
        error => {
          dispatch(registerImageFailure(error));
        }
      );
  };
};

const registerImageRequest = () => ({
  type: videoCaptureConstants.CAPTURE_IMAGE_REQUEST
});
const registerImageSuccess = data => ({
  type: videoCaptureConstants.CAPTURE_IMAGE_SUCCESS,
  payload: data
});
const registerImageFailure = error => ({
  type: videoCaptureConstants.CAPTURE_IMAGE_FAILURE,
  payload: error
});

export const startProductionRecording = () => {
  return dispatch => {
    dispatch(start_production_request());

    videoCaptureService.startProductionRecording()
      .then(
        data => {
          dispatch(start_production_success(data));
        },
        error => {
          dispatch(start_production_failure(error));
        }
      );
  };
};

export const endProductionRecording = () => {
  return dispatch => {
    dispatch(end_production_request());

    videoCaptureService.endProductionRecording()
      .then(
        data => {
          dispatch(success(data));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };
};

export const captureProductionImage = (captureToken) => {
  return dispatch => {
    dispatch(request(captureToken));

    videoCaptureService.captureProductionImage(captureToken)
      .then(
        data => {
          dispatch(end_production_success(data));
        },
        error => {
          dispatch(end_production_failure(error));
        }
      );
  };
};

const request = () => ({
  type: videoCaptureConstants.REQUEST
});
const success = data => ({
  type: videoCaptureConstants.SUCCESS,
  payload: data
});
const failure = error => ({
  type: videoCaptureConstants.FAILURE,
  payload: error
});

const start_production_request = data => ({
  type: videoCaptureConstants.START_PRODUCT_REQUEST,
  payload: data
})

const start_production_success = data => ({
  type: videoCaptureConstants.START_PRODUCT_SUCCESS,
  payload: data
})

const start_production_failure = error => ({
  type: videoCaptureConstants.START_PRODUCT_FAILURE,
  payload: error
})

const end_production_request = data => ({
  type: videoCaptureConstants.END_PRODUCT_REQUEST,
  payload: data
})

const end_production_success = data => ({
  type: videoCaptureConstants.END_PRODUCT_SUCCESS,
  payload: data
})

const end_production_failure = error => ({
  type: videoCaptureConstants.END_PRODUCT_FAILURE,
  payload: error
})

export const getVehicleByWorkID = (workID) => {
  return dispatch => {
    dispatch(getVehicleByWorkIDRequest());

    videoCaptureService.getVehicleByWorkID(workID)
      .then(
        data => {
          dispatch(getVehicleByWorkIDSuccess(data));
        },
        error => {
          dispatch(getVehicleByWorkIDFailure(error));
        }
      );
  };
};

const getVehicleByWorkIDRequest = () => ({
  type: videoCaptureConstants.GET_VEHICLE_BY_WORK_ID_REQUEST
});
const getVehicleByWorkIDSuccess = data => ({
  type: videoCaptureConstants.GET_VEHICLE_BY_WORK_ID_SUCCESS,
  payload: data
});
const getVehicleByWorkIDFailure = error => ({
  type: videoCaptureConstants.GET_VEHICLE_BY_WORK_ID_FAILURE,
  payload: error
});

export const getWork = (workID) => {
  return dispatch => {
    dispatch(getWorkRequest());

    videoCaptureService.getWork(workID)
      .then(
        data => {
          dispatch(getWorkSuccess(data));
        },
        error => {
          dispatch(getWorkFailure(error));
        }
      );
  };
};

const getWorkRequest = () => ({
  type: videoCaptureConstants.GET_WORK_REQUEST
});
const getWorkSuccess = data => ({
  type: videoCaptureConstants.GET_WORK_SUCCESS,
  payload: data
});
const getWorkFailure = error => ({
  type: videoCaptureConstants.GET_WORK_FAILURE,
  payload: error
});

export const registerPoint = (imageId, rateCoordinate) => {
  return dispatch => {
    dispatch(registerPointRequest(imageId, rateCoordinate));

    videoCaptureService.registerPoint(imageId, rateCoordinate)
      .then(
        data => {
          dispatch(registerPointSuccess(data));
        },
        error => {
          dispatch(registerPointFailure(error));
        }
      );
  };
};

const registerPointRequest = () => ({
  type: videoCaptureConstants.REGISTER_POINT_REQUEST,
});
const registerPointSuccess = data => ({
  type: videoCaptureConstants.REGISTER_POINT_SUCCESS,
  payload: data
});
const registerPointFailure = error => ({
  type: videoCaptureConstants.REGISTER_POINT_FAILURE,
  payload: error
});

export const deletePoint = (imageId, pointId) => {
  return dispatch => {
    dispatch(deletePointRequest());

    videoCaptureService.deletePoint(imageId, pointId)
      .then(
        data => {
          dispatch(deletePointSuccess(data));
        },
        error => {
          dispatch(deletePointFailure(error));
        }
      );
  };
};

const deletePointRequest = () => ({
  type: videoCaptureConstants.DELETE_POINT_REQUEST,
});
const deletePointSuccess = data => ({
  type: videoCaptureConstants.DELETE_POINT_SUCCESS,
  payload: data
});
const deletePointFailure = error => ({
  type: videoCaptureConstants.DELETE_POINT_FAILURE,
  payload: error
});

export const fetchPointsByWorkID = (workID) => {
  return dispatch => {
    dispatch(fetchPointsByWorkIDRequest());

    videoCaptureService.fetchPointsByWorkID(workID)
      .then(
        data => {
          dispatch(fetchPointsByWorkIDSuccess(data));
        },
        error => {
          dispatch(fetchPointsByWorkIDFailure(error));
        }
      );
  };
};

const fetchPointsByWorkIDRequest = () => ({
  type: videoCaptureConstants.FETCH_POINT_BY_WORK_ID_REQUEST,
});
const fetchPointsByWorkIDSuccess = data => ({
  type: videoCaptureConstants.FETCH_POINT_BY_WORK_ID_SUCCESS,
  payload: data
});
const fetchPointsByWorkIDFailure = error => ({
  type: videoCaptureConstants.FETCH_POINT_BY_WORK_ID_FAILURE,
  payload: error
});

export const fetchDeviceStates = () => {
  return dispatch => {
    dispatch(fetchDeviceStatesRequest());

    videoCaptureService.fetchDeviceStates()
      .then(
        data => {
          dispatch(fetchDeviceStatesSuccess(data));
        },
        error => {
          dispatch(fetchDeviceStatesFailure(error));
        }
      );
  };
};

const fetchDeviceStatesRequest = () => ({
  type: videoCaptureConstants.FETCH_DEVICE_STATES_REQUEST,
});
const fetchDeviceStatesSuccess = data => ({
  type: videoCaptureConstants.FETCH_DEVICE_STATES_SUCCESS,
  payload: data
});
const fetchDeviceStatesFailure = error => ({
  type: videoCaptureConstants.FETCH_DEVICE_STATES_FAILURE,
  payload: error
});

export const setTemplatesToAll = () => {
  return dispatch => {
    dispatch(setTemplatesToAllRequest());

    videoCaptureService.setTemplatesToAll()
      .then(
        data => {
          dispatch(setTemplatesToAllSuccess(data));
        },
        error => {
          dispatch(setTemplatesToAllFailure(error));
        }
      );
  };
};

const setTemplatesToAllRequest = () => ({
  type: videoCaptureConstants.SET_TEMPLATES_TO_ALL_REQUEST,
});
const setTemplatesToAllSuccess = data => ({
  type: videoCaptureConstants.SET_TEMPLATES_TO_ALL_SUCCESS,
  payload: data,
});
const setTemplatesToAllFailure = error => ({
  type: videoCaptureConstants.SET_TEMPLATES_TO_ALL_FAILURE,
  error: error,
});

export const getMatchingRate = (processNo) => {
  return dispatch => {
    dispatch(getMatchingRateRequest());

    videoCaptureService.getMatchingRate(processNo)
      .then(
        data => {
          dispatch(getMatchingRateSuccess(data));
        },
        error => {
          dispatch(getMatchingRateFailure(error));
        }
      );
  };
};

const getMatchingRateRequest = () => ({
  type: videoCaptureConstants.GET_MATCHING_RATE_REQUEST,
});
const getMatchingRateSuccess = data => ({
  type: videoCaptureConstants.GET_MATCHING_RATE_SUCCESS,
  payload: data
});
const getMatchingRateFailure = error => ({
  type: videoCaptureConstants.GET_MATCHING_RATE_FAILURE,
  payload: error
});
import {masterSettingConstants} from '../constants';
import {masterSettingService} from '../services/';

export const fetchVehicles = () => {
  return dispatch => {
    dispatch(requestFetchVehicles());

    masterSettingService.fetchVehicles()
      .then(
        data => {
          dispatch(successFetchVehicles(data));
        },
        error => {
          dispatch(failureFetchVehicles(error));
        }
      );
  };
};

const requestFetchVehicles = () => ({
  type: masterSettingConstants.FETCH_VEHICLES_REQUEST,
});
const successFetchVehicles = data => ({
  type: masterSettingConstants.FETCH_VEHICLES_SUCCESS,
  payload: data
});
const failureFetchVehicles = error => ({
  type: masterSettingConstants.FETCH_VEHICLES_FAILURE,
  payload: error
});

export const updateThreshold = (vehicleID, positionThresholdLevel, probabilityThresholdLevel) => {
  return dispatch => {
    dispatch(requestUpdateThreshold());

    masterSettingService.updateThreshold(vehicleID, positionThresholdLevel, probabilityThresholdLevel)
      .then(
        data => {
          dispatch(successUpdateThreshold(data, vehicleID, positionThresholdLevel, probabilityThresholdLevel));
        },
        error => {
          dispatch(failureUpdateThreshold(error));
        }
      );
  };
};

const requestUpdateThreshold = () => ({
  type: masterSettingConstants.UPDATE_THRESHOLD_REQUEST,
});
const successUpdateThreshold = (data, vehicleID, positionThresholdLevel, probabilityThresholdLevel) => ({
  type: masterSettingConstants.UPDATE_THRESHOLD_SUCCESS,
  payload: data,
  vehicleID: vehicleID,
  positionThresholdLevel: positionThresholdLevel,
  probabilityThresholdLevel: probabilityThresholdLevel,
});
const failureUpdateThreshold = error => ({
  type: masterSettingConstants.UPDATE_THRESHOLD_FAILURE,
  payload: error
});
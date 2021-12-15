import {apiUrl} from '../config';
import {responseHandler} from '../helpers';

export const masterSettingService = {
  fetchVehicles,
  updateThreshold,
};

function fetchVehicles() {
  return fetch(`${apiUrl}master-setting/fetch/`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function updateThreshold(vehicleID, positionThresholdLevel, probabilityThresholdLevel) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        vehicle_id: vehicleID,
        position_threshold_level: positionThresholdLevel,
        probability_threshold_level: probabilityThresholdLevel,
      }
    )
  };

  return fetch(`${apiUrl}master-setting/update/threshold`, requestOptions)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}
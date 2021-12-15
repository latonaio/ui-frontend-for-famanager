import {apiUrl} from '../config';
import {responseHandler} from '../helpers';

export const cameraService = {
  getCameraByUsageID,
  getAllCamera,
};

function getCameraByUsageID(usageID) {
  return fetch(`${apiUrl}/get/camera/${usageID}`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function getAllCamera() {
  return fetch(`${apiUrl}/get/all-camera`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

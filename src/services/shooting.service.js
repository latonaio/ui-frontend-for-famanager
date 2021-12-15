import {apiUrl} from '../config';
import {responseHandler} from '../helpers';

export const shootingService = {
  getCurrentVehicle,
  getResult,
  getRtspToWsPort,
  stopRtspToWs,
};

function getCurrentVehicle() {
  return fetch(`${apiUrl}shooting/get/current-vehicle`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function getRtspToWsPort(usageID, isProduction) {
  return fetch(`${apiUrl}video/get-rtsp-to-ws-port/${usageID}/${isProduction ? "production" : "test"}`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function stopRtspToWs() {
  return fetch(`${apiUrl}video/stop-rtsp-to-ws`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function getResult() {
  return fetch(`${apiUrl}production-start/get/`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}
import {apiUrl} from '../config';
import {responseHandler} from '../helpers';
import axios from 'axios';

export const videoCaptureService = {
  getImageByWorkID,
  registerImage,
  startProductionRecording,
  endProductionRecording,
  captureProductionImage,
  getVehicleByWorkID,
  getWork,
  registerPoint,
  deletePoint,
  fetchPointsByWorkID,
  fetchDeviceStates,
  setTemplatesToAll,
  getMatchingRate,
};

function getImageByWorkID(workID) {
  return fetch(`${apiUrl}/test-shooting/get/image-by-work-id/${workID}`)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}

function registerImage(workID, blob) {
  const formData = new FormData();
  formData.append("blob", blob)
  formData.append("workID", workID)

  return axios.post(
    `${apiUrl}file/upload/image`,
    formData,
    {})
    .then(data => {
      return data.data;
    });
}

function startProductionRecording() {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        isProduction: true,
      }
    )
  };

  return fetch(`${apiUrl}/runtime/start-recording/`, requestOptions)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("ポイントが登録されていません")
      }
      return response;
    })
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

function endProductionRecording() {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        isProduction: true,
      }
    )
  };

  return fetch(`${apiUrl}/runtime/end-recording/`, requestOptions)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}

function captureProductionImage(captureToken) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        isProduction: true,
        captureToken: captureToken,
      }
    )
  };
  return fetch(`${apiUrl}/runtime/capture-image/`, requestOptions)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}

function getVehicleByWorkID(workID) {
  return fetch(`${apiUrl}/get/vehicle/by-work-id/${workID}`)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}

function getWork(workID) {
  return fetch(`${apiUrl}/get/work/${workID}`)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}

function registerPoint(imageId, rateCoordinate) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        imageId: imageId,
        rateCoordinate: rateCoordinate,
      }
    )
  };

  return fetch(`${apiUrl}/annotation-register/register/point/`, requestOptions)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}

function deletePoint(imageId, pointId) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        pointId: pointId,
        imageId: imageId,
      }
    )
  };

  return fetch(`${apiUrl}/annotation-register/delete/point/`, requestOptions)
    .then(responseHandler)
    .then(data => {
      return data;
    });
}

function fetchPointsByWorkID(workID) {
  return fetch(`${apiUrl}/fetch/points/by-work-id/${workID}`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function fetchDeviceStates() {
  return fetch(`${apiUrl}/fetch/device-states`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function setTemplatesToAll() {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {}
    )
  };

  return fetch(`${apiUrl}/set/template/`, requestOptions)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}

function getMatchingRate(processNo) {
  return fetch(`${apiUrl}/get/matching/${processNo}`)
    .then(responseHandler)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}
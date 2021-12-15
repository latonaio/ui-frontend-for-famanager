import {publicUrl} from '../config';
import {videoCaptureConstants} from '../constants';

const initialState = {
  rows: [],
  error: null,
  imageURL: "/no_image.jpg",
  imageID: null,
  isShooting: false,
  work: {},
  vehicle: {},
  device: {}, // TODO devicesに統合する
  point: [],
  devices: [],
  matching: [],
  isAvailable: false,
};

export function video_capture(state = initialState, action) {
  if (action.type === videoCaptureConstants.GET_IMAGE_BY_WORK_ID_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === videoCaptureConstants.GET_IMAGE_BY_WORK_ID_SUCCESS) {
    let url = "/no_image.jpg";
    if (action.payload.image_path_from_public) {
      url = publicUrl + "/" + action.payload.image_path_from_public;
    }

    return {
      ...state,
      imageURL: url,
      imageID: action.payload.image_id,
    };
  } else if (action.type === videoCaptureConstants.GET_IMAGE_BY_WORK_ID_FAILURE) {
    return {
      ...state,
      imageURL: "/no_image.jpg",
      imageID: null,
    };
  } else if (action.type === videoCaptureConstants.CAPTURE_IMAGE_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === videoCaptureConstants.CAPTURE_IMAGE_SUCCESS) {
    alert("画像の取得が完了しました。\n画像取得を確認してください。");
    let url = "/no_image.jpg";
    if (action.payload.image) {
      url = publicUrl + action.payload.image.image_path;
    }

    return {
      ...state,
      imageURL: url,
      imageID: action.payload.image.image_id,
      point: [],
    };
  } else if (action.type === videoCaptureConstants.CAPTURE_IMAGE_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === videoCaptureConstants.GET_VEHICLE_BY_WORK_ID_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === videoCaptureConstants.GET_VEHICLE_BY_WORK_ID_SUCCESS) {
    let vehicle = {};
    let device = {};
    if (action.payload.length > 0) {
      vehicle = {
        vehicleID: action.payload[0].vehicle_id,
        name: action.payload[0].name,
        no: action.payload[0].no,
        deviceID: action.payload[0].device_id,
      };
      device = {
        deviceID: action.payload[0].device_id,
        deviceSymbol: action.payload[0].device_symbol,
      }
    }

    return {
      ...state,
      vehicle,
      device,
    };
  } else if (action.type === videoCaptureConstants.GET_VEHICLE_BY_WORK_ID_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === videoCaptureConstants.GET_WORK_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === videoCaptureConstants.GET_WORK_SUCCESS) {
    let work = {};
    if (action.payload.length > 0) {
      work = {
        workID: action.payload[0].work_id,
        vehicleID: action.payload[0].vehicleID,
        name: action.payload[0].name,
        positionThresholdLevel: action.payload[0].position_threshold_level,
        probabilityThresholdLevel: action.payload[0].probability_threshold_level,
      };
    }

    return {
      ...state,
      work,
    };
  } else if (action.type === videoCaptureConstants.GET_WORK_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === videoCaptureConstants.START_PRODUCT_REQUEST) {
    return {
      ...state,
      isShooting: true,
    };
  } else if (action.type === videoCaptureConstants.START_PRODUCT_FAILURE) {
    return {
      ...state,
      isShooting: false,
    };
  } else if (action.type === videoCaptureConstants.END_PRODUCT_REQUEST) {
    return {
      ...state,
      isShooting: false,
    };
  } else if (action.type === videoCaptureConstants.REGISTER_POINT_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === videoCaptureConstants.REGISTER_POINT_SUCCESS) {
    const point = [];
    for (let i = 0; i < action.payload.length; i++) {
      point.push({
        pointImageURL: publicUrl + action.payload[i].point_image_path,
        ...action.payload[i]
      });

    }
    return {
      ...state,
      point,
    };
  } else if (action.type === videoCaptureConstants.REGISTER_POINT_FAILURE) {
    alert("Error: ポイントの登録に失敗しました。");
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === videoCaptureConstants.DELETE_POINT_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === videoCaptureConstants.DELETE_POINT_SUCCESS) {
    const point = [];
    for (let i = 0; i < action.payload.length; i++) {
      point.push({
        pointImageURL: publicUrl + action.payload[i].point_image_path,
        ...action.payload[i]
      });
    }
    return {
      ...state,
      point,
    };
  } else if (action.type === videoCaptureConstants.DELETE_POINT_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === videoCaptureConstants.FETCH_POINT_BY_WORK_ID_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === videoCaptureConstants.FETCH_POINT_BY_WORK_ID_SUCCESS) {
    const point = [];
    for (let i = 0; i < action.payload.length; i++) {
      point.push({
        pointImageURL: publicUrl + action.payload[i].point_image_path,
        ...action.payload[i]
      });
    }
    return {
      ...state,
      point,
    };
  } else if (action.type === videoCaptureConstants.FETCH_POINT_BY_WORK_ID_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === videoCaptureConstants.FETCH_DEVICE_STATES_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === videoCaptureConstants.FETCH_DEVICE_STATES_SUCCESS) {
    return {
      ...state,
      devices: action.payload,
    };
  } else if (action.type === videoCaptureConstants.FETCH_DEVICE_STATES_FAILURE) {
    return {
      ...state,
    };
  } else if (action.type === videoCaptureConstants.SET_TEMPLATES_TO_ALL_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === videoCaptureConstants.SET_TEMPLATES_TO_ALL_SUCCESS) {
    return {
      ...state,
      isAvailable: true,
    };
  } else if (action.type === videoCaptureConstants.SET_TEMPLATES_TO_ALL_FAILURE) {
    alert('テンプレートがセットされていないワークがあります。全てのワークでポイントが1件以上登録されていることを確認してください。')
    return {
      ...state,
      isAvailable: false,
      error: action.error,
    };
  } else if (action.type === videoCaptureConstants.GET_MATCHING_RATE_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === videoCaptureConstants.GET_MATCHING_RATE_SUCCESS) {
    return {
      ...state,
      matching: action.payload,
    };
  } else if (action.type === videoCaptureConstants.GET_MATCHING_RATE_FAILURE) {
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

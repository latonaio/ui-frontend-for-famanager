import {masterSettingConstants} from '../constants';

const initialState = {
  rows: [],
  error: null,
  isUpdating: false,
};

export function master_setting(state = initialState, action) {
  switch (action.type) {
    case masterSettingConstants.FETCH_VEHICLES_REQUEST:
      return {
        ...state,
      };
    case masterSettingConstants.FETCH_VEHICLES_SUCCESS:
      const rows = action.payload;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].works.length > 0) {
          rows[i].position_threshold_level = rows[i].works[0].position_threshold_level;
          rows[i].probability_threshold_level = rows[i].works[0].probability_threshold_level;
        } else {
          rows[i].position_threshold_level = "1";
          rows[i].probability_threshold_level = "1";
        }
      }
      return {
        ...state,
        rows: rows,
      };
    case masterSettingConstants.FETCH_VEHICLES_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case masterSettingConstants.UPDATE_THRESHOLD_REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case masterSettingConstants.UPDATE_THRESHOLD_SUCCESS:
      const new_rows = state.rows;
      for (let i = 0; i < state.rows.length; i++) {
        if (new_rows[i].vehicle_id === action.vehicleID) {
          new_rows[i].position_threshold_level = action.positionThresholdLevel;
          new_rows[i].probability_threshold_level = action.probabilityThresholdLevel;
        }
      }

      alert("感度を設定しました");
      return {
        ...state,
        rows: new_rows,
        isUpdating: false,
      };
    case masterSettingConstants.UPDATE_THRESHOLD_FAILURE:
      alert("感度の設定に失敗しました");
      return {
        ...state,
        isUpdating: false,
      };
    default:
      return {
        ...state,
      };
  }
}

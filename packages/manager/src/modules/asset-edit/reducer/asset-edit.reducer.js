import { FETCH_EDIT_ASSET_INFO } from "modules/asset-edit/asset-edit.constants";
import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";
const assetEditReducer = apiReducerFactory({
  apiType: FETCH_EDIT_ASSET_INFO
});

export default combineReducers({
  submit: assetEditReducer
});

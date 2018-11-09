import { combineReducers } from "redux";
import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import { TOURNAMENT_PROGRAM_CREATE } from "../actions/program-tournament-actions.constants";

const createData = apiReducerFactory({
  apiType: TOURNAMENT_PROGRAM_CREATE
});

export default combineReducers({
  createData
});

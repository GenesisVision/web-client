import { combineReducers } from "redux";

import dashboardChartReducer from "./dashboard-chart-reducer";
import dashboardProgramsReducer from "./dashboard-program-reducer";
import dashboardFavoritePrograms from './dashboard-favorite-reducer';
const dashboardReducer = combineReducers({
  programs: dashboardProgramsReducer,
  chart: dashboardChartReducer,
  favoritePrograms: dashboardFavoritePrograms
});
export default dashboardReducer;

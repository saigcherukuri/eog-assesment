import { reducer as weatherReducer } from '../Feature/Weather/reducer'
import { reducer as dashboardReducer } from '../Feature/Dashboard/reducer';
export default {
  weather: weatherReducer,
  dashboard: dashboardReducer,
};

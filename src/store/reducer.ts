import { combineReducers } from 'redux';
import repoSlice from '../slice/repo';

const rootReducer = combineReducers({
  repo: repoSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

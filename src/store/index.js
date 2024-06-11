import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies/moviesSlice';
import searchReducer from './Search/searchSlice';
const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search: searchReducer
  },
});

export default store;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { popularURL } from '../../api';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(popularURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        rating: movie.vote_average,
        imgUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
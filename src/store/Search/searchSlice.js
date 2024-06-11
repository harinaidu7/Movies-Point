import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiURL } from '../../api';


export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query) => {
    const response = await fetch(`${apiURL}${query}`);
    const data = await response.json();
    return data.results;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchQuery: '',
    searchResults: [],
    status: 'idle',
    error: null
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;

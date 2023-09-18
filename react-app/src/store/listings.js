import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchListings = createAsyncThunk('listings/fetchListings', async () => {
  const response = await fetch('/api/listings'); // Adjust the endpoint according to your backend setup
  const data = await response.json();
  return data;
});

const listingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default listingsSlice.reducer;

export const selectAllListings = (state) => state.listings.listings;
export const selectStatus = (state) => state.listings.status;
export const selectError = (state) => state.listings.error;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// homepage/get all listings page 
export const fetchListings = createAsyncThunk('listings/fetchListings', async () => {
  const response = await fetch('/api/listings'); // Adjust the endpoint according to your backend setup
  const data = await response.json();
  return data;
});

// create listings route 
export const createListing = createAsyncThunk('listings/createListing', async (newListingData) => {
  const response = await fetch('/api/listings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newListingData),
  });
  const data = await response.json();
  return data;
});

// new thunk for fetching a single listing by ID
export const fetchListingById = createAsyncThunk('listings/fetchListingById', async (id) => {
  const response = await fetch(`/api/listings/${id}`);
  const data = await response.json();
  return data;
});

const listingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: [],
    currentListing: null, // New property to hold the current listing data
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
      })
      .addCase(fetchListingById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListingById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentListing = action.payload; // Save the fetched listing data in the state
      })
      .addCase(fetchListingById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default listingsSlice.reducer;

export const selectAllListings = (state) => state.listings.listings;
export const selectCurrentListing = (state) => state.listings.currentListing; // New selector to select the current listing data
export const selectStatus = (state) => state.listings.status;
export const selectError = (state) => state.listings.error;

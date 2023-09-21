import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// homepage/get all listings page 
export const fetchListings = createAsyncThunk('listings/fetchListings', async () => {
  const response = await fetch('/api/listings');
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
    credentials: 'include',
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

// new thunk for updating a listing
export const updateListing = createAsyncThunk('listings/updateListing', async ({ id, updatedData }) => {
  const response = await fetch(`/api/listings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
    credentials: 'include',
  });
  const data = await response.json();
  return data;
});

// new thunk for deleting a listing
export const deleteListing = createAsyncThunk('listings/deleteListing', async (id) => {
  const response = await fetch(`/api/listings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return response.json();
});

const listingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: [],
    currentListing: null,
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
        state.currentListing = action.payload;
      })
      .addCase(fetchListingById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateListing.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.listings.findIndex(listing => listing.id === action.payload.id);
        if (index !== -1) {
          state.listings[index] = action.payload;
        }
        state.currentListing = action.payload;
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteListing.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listings = state.listings.filter(listing => listing.id !== action.payload.id);
        if (state.currentListing && state.currentListing.id === action.payload.id) {
          state.currentListing = null;
        }
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default listingsSlice.reducer;

export const selectAllListings = (state) => state.listings.listings;
export const selectCurrentListing = (state) => state.listings.currentListing;
export const selectStatus = (state) => state.listings.status;
export const selectError = (state) => state.listings.error;

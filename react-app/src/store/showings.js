import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create a showing for a specific listing
export const createShowing = createAsyncThunk('showings/create', async ({ listingId, newShowingData }) => {
  const response = await fetch(`/api/listings/${listingId}/showings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newShowingData),
    credentials: 'include',
  });
  return response.json();
});

// Fetch showing details for a specific listing and showing ID
export const fetchShowingDetails = createAsyncThunk('showings/fetchDetails', async ({ listingId, showingId }) => {
  const response = await fetch(`/api/listings/${listingId}/showings/${showingId}`);
  return response.json();
});

// Fetch all showings for a specific listing
export const fetchAllShowingsForListing = createAsyncThunk('showings/fetchAllForListing', async (listingId) => {
  const response = await fetch(`/api/listings/${listingId}/showings`);
  return response.json();
});

// Delete a showing for a specific listing and showing ID
export const deleteShowing = createAsyncThunk('showings/delete', async ({ listingId, showingId }) => {
  const response = await fetch(`/api/listings/${listingId}/showings/${showingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return response.json();
});

// Edit a showing for a specific listing and showing ID
export const editShowing = createAsyncThunk('showings/edit', async ({ listingId, showingId, updatedData }) => {
  const response = await fetch(`/api/listings/${listingId}/showings/${showingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
    credentials: 'include',
  });
  return response.json();
});

const showingsSlice = createSlice({
  name: 'showings',
  initialState: {
    all: [],
    current: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createShowing.fulfilled, (state, action) => {
        state.all.push(action.payload);
      })
      .addCase(fetchShowingDetails.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(fetchAllShowingsForListing.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(deleteShowing.fulfilled, (state, action) => {
        state.all = state.all.filter(showing => showing.id !== action.payload.id);
      })
      .addCase(editShowing.fulfilled, (state, action) => {
        const index = state.all.findIndex(showing => showing.id === action.payload.id);
        if (index !== -1) {
          state.all[index] = action.payload;
        }
      });
  },
});

export default showingsSlice.reducer;

export const selectAllShowings = (state) => state.showings.all;
export const selectCurrentShowing = (state) => state.showings.current;

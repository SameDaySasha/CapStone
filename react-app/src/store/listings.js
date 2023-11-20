import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchListings = createAsyncThunk('listings/fetchAll', async () => {
  const response = await fetch('/api/listings');
  return response.json();
});

export const createListing = createAsyncThunk('listings/create', async (newListingData) => {
  const response = await fetch('/api/listings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newListingData),
    credentials: 'include',
  });
  return response.json();
});

export const fetchListingById = createAsyncThunk('listings/fetchById', async (id) => {
  const response = await fetch(`/api/listings/${id}`);
  return response.json();
});

export const updateListing = createAsyncThunk('listings/update', async ({ id, updatedData }) => {
  const response = await fetch(`/api/listings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
    credentials: 'include',
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorData = await response.json();
    // Throw the errors object for better handling
    throw new Error(JSON.stringify(errorData.errors));
  }
});


export const deleteListing = createAsyncThunk('listings/delete', async (id) => {
  const response = await fetch(`/api/listings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return response.json();
});

// New thunk for updating the bid amount
export const updateBid = createAsyncThunk('listings/updateBid', async ({ listingId, newBid }) => {
  const response = await fetch(`/api/listings/${listingId}/current_price`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ price: newBid }), // Updated to match the API expectation
  });
  if (!response.ok) {
    throw new Error('Failed to update bid');
  }
  return { listingId, newBid: await response.json() };
});

const listingsSlice = createSlice({
  name: 'listings',
  initialState: {
    all: [],
    current: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          const { type, payload } = action;

          if (type.startsWith('listings/fetchAll')) {
            state.all = payload;
          } else if (type.startsWith('listings/fetchById')) {
            state.current = payload;
          } else if (type.startsWith('listings/update')) {
            const index = state.all.findIndex(listing => listing.id === payload.id);
            if (index !== -1) {
              state.all[index] = payload;
            }
            state.current = payload;
          } else if (type.startsWith('listings/delete')) {
            state.all = state.all.filter(listing => listing.id !== payload.id);
            if (state.current && state.current.id === payload.id) {
              state.current = null;
            }
          }else if (type === updateBid.fulfilled.type) {
            // Handle the updateBid action
            const index = state.all.findIndex(listing => listing.id === payload.listingId);
            if (index !== -1) {
              state.all[index].price = payload.newBid.price; // Updated to match API response
            }
            if (state.current && state.current.id === payload.listingId) {
              state.current.price = payload.newBid.price; // Updated to match API response
            }
          }
        }
      );
  },
});

export default listingsSlice.reducer;

export const selectAllListings = (state) => state.listings.all;
export const selectCurrentListing = (state) => state.listings.current;

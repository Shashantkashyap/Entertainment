import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSearch: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    selectedSearch: (state, action) => {
      state.selectedSearch = action.payload;
    },
  },
});

export const { selectedSearch } = searchSlice.actions;

export default searchSlice.reducer;
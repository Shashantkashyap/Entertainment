import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCardId: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    selectedCard: (state, action) => {
      state.selectedCardId = action.payload;
    },
  },
});

export const { selectedCard } = cardsSlice.actions;

export default cardsSlice.reducer;
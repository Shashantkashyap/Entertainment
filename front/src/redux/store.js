import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardSlice';
import searchReducer from "./searchSlice"

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    search: searchReducer
  },
});
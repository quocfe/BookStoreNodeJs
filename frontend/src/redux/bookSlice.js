import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
	name: 'book',
	initialState: {
		data: [],
	},
	reducers: {
		searchBook: (state, action) => {
			localStorage.removeItem('books');
			state.data = action.payload;
			localStorage.setItem('books', JSON.stringify(action.payload));
		},
		getAllBook: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { searchBook, getAllBook } = bookSlice.actions;

export default bookSlice.reducer;

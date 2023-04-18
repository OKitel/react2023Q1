import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormDataWithID, FormData } from './models';

type FormState = {
  submissions: Array<FormDataWithID>;
  id: number;
};

const initialState: FormState = {
  submissions: [],
  id: 1,
};

const INCREMENT_ID = 1;

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addSubmission(state, { payload }: PayloadAction<{ submission: FormData }>) {
      const { submission } = payload;
      const newId = state.id + INCREMENT_ID;
      const submissionWithId = { ...submission, id: newId };
      state.submissions = [...state.submissions, submissionWithId];
      state.id = newId;
    },
  },
});
export const { actions, reducer: formReducer } = formSlice;
export const { addSubmission } = actions;

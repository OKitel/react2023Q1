import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PhotoDTO } from './models';

type PhotosState = {
  photos: Array<PhotoDTO>;
  query: string;
};

const initialState: PhotosState = {
  photos: [],
  query: '',
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotos(state, { payload }: PayloadAction<{ photos: Array<PhotoDTO> }>) {
      const { photos } = payload;
      state.photos = photos;
    },
    setQuery(state, { payload }: PayloadAction<string>) {
      const query = payload;
      state.query = query;
    },
  },
});
export const { actions, reducer: photosReducer } = photosSlice;
export const { setPhotos, setQuery } = actions;

import { createReducer, on } from '@ngrx/store';
import * as PhotoActions from './photo-store.action';
import { PhotoResponse } from './photo-store.model';

export interface PhotoState {
  photosResponse: PhotoResponse | null;
  loading: boolean;
  error: any;
}

export const initialState: PhotoState = {
  photosResponse: null,
  loading: false,
  error: null,
};

export const photoReducer = createReducer(
  initialState,
  on(PhotoActions.loadPhotos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PhotoActions.loadPhotosSuccess, (state, { photos }) => ({
    ...state,
    photos,
    loading: false,
    error: null,
  })),
  on(PhotoActions.loadPhotosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
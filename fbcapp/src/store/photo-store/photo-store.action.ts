import { createAction, props } from '@ngrx/store';
import { PhotoResponse } from './photo-store.model';

export const loadPhotos = createAction(
  '[Photo/API] Load Photos',
  props<{ color: string | null, page?: number }>()
);

export const loadPhotosSuccess = createAction(
  '[Photo/API] Load Photos Success',
  props<{ photos: PhotoResponse }>()
);

export const loadPhotosFailure = createAction(
  '[Photo/API] Load Photos Failure',
  props<{ error: any }>()
);
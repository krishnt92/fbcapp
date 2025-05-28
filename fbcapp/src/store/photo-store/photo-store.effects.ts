import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PhotoService } from './photo-store.service';
import * as PhotoActions from './photo-store.action';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PhotoEffects {
  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotoActions.loadPhotos),
      mergeMap(({ color }) =>
        this.photoService.getPhotos(color).pipe(
          map((photos) => PhotoActions.loadPhotosSuccess({ photos })),
          catchError((error) => of(PhotoActions.loadPhotosFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private photoService: PhotoService
  ) {}
}
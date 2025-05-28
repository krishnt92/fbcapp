import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PhotoActions from '../../store/photo-store/photo-store.action';
import { Photo, PhotoResponse } from '../../store/photo-store/photo-store.model';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  photos$: Observable<Photo[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  public photos: Photo[] = [];
  public photosResponse: PhotoResponse | null = null;

  constructor(private store: Store<any>) {
    this.photos$ = this.store.select(state => state.photos.photos);
    this.loading$ = this.store.select(state => state.photos.loading);
    this.error$ = this.store.select(state => state.photos.error);
  }

  public ngOnInit() {
    this.store.dispatch(PhotoActions.loadPhotos({ color: 'all' }));

    this.store.select(state => state.photos).subscribe(state => {
      console.log('Current photo state:', state);
      if (state.error) {
        this.photos = [];
        console.error('Error loading photos:', state.error);
      }
    }
    );
    this.store.select(state => state.photos.loading).subscribe(loading => {
      if (loading) {
        console.log('Loading photos...');
        this.photos = [];
      } else {
        console.log('Photos loaded successfully.');
      }
    }
    );
    this.store.select(state => state.photos.photos).subscribe(photos => {
      console.log('PHOTOS:', photos);
      if (photos && photos?.photos?.photo?.length > 0) {
        this.photosResponse = photos.photos;
        console.log('Photos response:', this.photosResponse);
        this.photos = photos.photos.photo;
        console.log('Photos loaded:', photos);
      } else {
        this.photos = [];
        console.log('No photos available.');
      }
    }
    );
  }

  public ngOnDestroy() {}

  public filterPhotos(color?: string): void {
    let filterColor = null;
    if (color === 'red') {
      filterColor = '0';
    } else if (color === 'green') {
      filterColor = '5';
    } else if (color === 'blue') {
      filterColor = '8';
    }
    this.store.dispatch(PhotoActions.loadPhotos({ color: filterColor }));
  }

  public getImageURL(photo: Photo): string { 
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
}
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PhotoActions from '../../store/photo-store/photo-store.action';
import { Photo, PhotoResponse } from '../../store/photo-store/photo-store.model';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  photos$: Observable<Photo[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  public photos: Photo[] = [];
  public photosResponse: PhotoResponse | null = null;
  public selectedColor: string = 'all';
  public currentPage: number = 1;

  constructor(private store: Store<any>) {
    this.photos$ = this.store.select(state => state.photos.photos);
    this.loading$ = this.store.select(state => state.photos.loading);
    this.error$ = this.store.select(state => state.photos.error);
  }

  public ngOnInit() {
    this.store.dispatch(PhotoActions.loadPhotos({ color: 'all', page: this.currentPage }));

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
      } else {
        console.log('Photos loaded successfully.');
      }
    }
    );
    this.store.select(state => state.photos.photos).subscribe(photos => {
      console.log('PHOTOS:', photos);
      if (this.currentPage > 1 && photos && photos?.photos?.photo?.length > 0) {
        this.photos = [...this.photos, ...photos.photos.photo];
      } else if (photos && photos?.photos?.photo?.length > 0) {
        this.photos = photos.photos.photo;
      } else {
        this.photos = [];
      }
    }
    );
  }

  public ngOnDestroy() {}

  public filterPhotos(color?: string): void {
    let filterColor = null;
    this.photos = [];
    if (color === 'red') filterColor = '0';
    else if (color === 'green') filterColor = '5';
    else if (color === 'blue') filterColor = '8';
    this.selectedColor = color || 'all';
    this.currentPage = 1;
    this.store.dispatch(PhotoActions.loadPhotos({ color: filterColor, page: this.currentPage }));
  }

  public addMorePhotos() {
    this.currentPage += 1;
    let filterColor = null;
    if (this.selectedColor === 'red') filterColor = '0';
    else if (this.selectedColor === 'green') filterColor = '5';
    else if (this.selectedColor === 'blue') filterColor = '8';
    this.store.dispatch(PhotoActions.loadPhotos({ color: filterColor, page: this.currentPage }));
  }

  public getImageURL(photo: Photo): string { 
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  }
}
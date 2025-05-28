import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PhotoResponse } from './photo-store.model';
import { FLICKR_API_KEY, FLICKR_API_URL } from '../../config/api-config';

@Injectable({ providedIn: 'root' })
export class PhotoService {
    constructor(private http: HttpClient) { }

    getPhotos(color: string | null): Observable<PhotoResponse> {

        const apiKey = FLICKR_API_KEY;
        let apiUrl = `${FLICKR_API_URL}&api_key=${apiKey}&format=json&nojsoncallback=1&page=1&per_page=20`;
        console.log('COLOR:', color);
        if (!!color && color !== 'all') {
            apiUrl += `&color_codes=${color}`;
        }
        return this.http.get<any>(apiUrl).pipe(
            map(response => {
                console.log('Flickr API Response:', response);
                return response as PhotoResponse;
            }
            )
        );
    }
}
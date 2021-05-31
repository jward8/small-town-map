import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Episode } from 'app/data/episode';
import { Town } from 'app/data/town';
import { GeoJson } from 'app/data/geojson';
import { GeoCollection } from 'app/data/geocollection';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  BASE_URL = environment.server_url;

  constructor(private http: HttpClient) { }

  getLatestDate(): Observable<Boolean>{
    return this.http.get<Boolean>(this.BASE_URL+'/latestDate');
  }

  getPoints(rssData: Episode[]): Observable<Town[]>{
    return this.http.post<Town[]>(this.BASE_URL + '/coordinates', rssData);
  }

  getEpisodeData(): Observable<Episode[]> {
    return this.http.get<Episode[]>(this.BASE_URL + '/rssData');
  }

  getGeoJsonData(): Observable<GeoCollection>{
    return this.http.get<GeoCollection>(this.BASE_URL + '/geojson');
  }
}

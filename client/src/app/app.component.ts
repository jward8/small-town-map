import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http'
import { MAP_KEY, MAP_STYLE } from './data/KEYS';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'small-town-map';
  RSS_URL = `https://www.omnycontent.com/d/playlist/aaea4e69-af51-495e-afc9-a9760146922b/46c6373e-26ec-4a0d-a300-aadc0017dd97/e67fc310-4408-4735-8916-aadc0017dda5/podcast.rss`

  map: any;
  data: any;
  ep_data: Object = {
    'data': []
  };

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.createMap();
  }

  createMap(): void{
    mapboxgl.accessToken = MAP_KEY;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: MAP_STYLE,
      center: [-87.909416, 43.041069],
      zoom: 3.75
    });
  }
}

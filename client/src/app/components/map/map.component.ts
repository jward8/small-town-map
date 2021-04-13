import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http'
import { MAP_KEY, MAP_STYLE } from '../../data/KEYS';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  title = 'small-town-map';

  map: any;
  data: any;
  ep_data: Object = {
    'data': []
  };

  constructor(){

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

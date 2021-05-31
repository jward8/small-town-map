import { Component, OnInit } from '@angular/core';
import { MAP_KEY, MAP_STYLE } from './data/KEYS';
import mapboxgl from 'mapbox-gl';
import { MapService } from './services/map.service';
import { GeoCollection } from './data/geocollection';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'small-town-map';

  map: any;
  ep_geojson: GeoCollection;

  constructor(private service: MapService){

  }

  ngOnInit(): void {
    
  }
}

import { Component, OnInit } from '@angular/core';
import { MAP_KEY, MAP_STYLE } from './data/KEYS';
import mapboxgl from 'mapbox-gl';
import { MapService } from './services/map.service';
import { GeoJson } from './data/geojson';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'small-town-map';

  map: any;
  ep_geojson: GeoJson[];

  constructor(private service: MapService){

  }

  ngOnInit(): void {
    this.service.getLatestDate().subscribe(
      shouldUpdate => {
        if(!shouldUpdate){
          this.service.getEpisodeData().subscribe(
            rssData => {
              this.service.getPoints(rssData).subscribe(
                data => {
                  console.log(data);
                }
              );
            }
          );
        }
        this.service.getGeoJsonData().subscribe(
          data => {
            this.ep_geojson = data;
            console.log(this.ep_geojson);
            this.createMap();
          }
        )
      }
    )
  }

  createMap(): void{
    mapboxgl.accessToken = `pk.eyJ1IjoiamFja21pY2hhZWwtd2FyZCIsImEiOiJja24zdWVpNGMxYjR2MnBtaGI5a216YmJkIn0.jrYVa77az9t2kplgJdgYmw`;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jackmichael-ward/cklmjvhp63wc317p79b13hsrs',
      center: [-87.909416, 43.041069],
      zoom: 3.75
    });

    let town = this.ep_geojson;

    this.map.on('load', function(){
      this.addSource('towns', {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": town
        }
      });

      this.addLayer({
        'id': 'town-layer',
        'type': 'circle',
        'source': 'towns',
        'paint': {
          'circle-stroke-color': '#EF8275',
          'circle-stroke-width': 1,
          'circle-color': '#EF8275'
        }
      });

      this.on('click', 'town-layer', function(e){ 
        var coordinates = e.features[0].geometry.coordinates.slice();
        var title = e.features[0].properties.name;

        while(Math.abs(e.lngLat.lng - coordinates[0]) > 180){
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(title)
          .addTo(this);
      });
    });

    this.map.getCanvas().style.cursor = 'pointer';
  }
}

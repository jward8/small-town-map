import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http'
import { MAP_KEY, MAP_STYLE } from '../../data/KEYS';
import mapboxgl from 'mapbox-gl';
import { MapService } from 'app/services/map.service';
import { GeoJson } from 'app/data/geojson';

@Component({
  selector: 'murder-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
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
    var title = document.getElementById('title');

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
          'circle-stroke-color': '#909191',
          'circle-stroke-width': 1,
          'circle-color': '#951f1e'
        }
      });

      this.on('click', 'town-layer', function(e){ 
        var coordinates = e.features[0].geometry.coordinates.slice();
        var title = e.features[0].properties.name;
        var link = e.features[0].properties.link;

        while(Math.abs(e.lngLat.lng - coordinates[0]) > 180){
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML('<h3 class=\'popup-title\'>' + title + '</h3>' + '\n <a href=\"' + link + '\" target=\"_blank\">Listen to the episode here!</a>')
          .addTo(this);
      });
    });

    this.map.getCanvas().style.cursor = 'pointer';
  }
}

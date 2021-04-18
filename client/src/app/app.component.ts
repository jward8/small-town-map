import { Component, OnInit } from '@angular/core';
import { MAP_KEY, MAP_STYLE } from './data/KEYS';
import mapboxgl from 'mapbox-gl';
import { MapService } from './services/map.service';
import { Episode } from './data/episode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'small-town-map';

  map: any;
  ep_data: Object = {
    'data': []
  };

  constructor(private service: MapService){

  }

  ngOnInit(): void {
    this.service.getEpisodeData().subscribe(
      data => {
        this.service.getPoints(data).subscribe(
          data => {
            console.log(data);
          }
        );
      }
    );

    

    this.createMap();
  }

  createMap(): void{
    mapboxgl.accessToken = `pk.eyJ1IjoiamFja21pY2hhZWwtd2FyZCIsImEiOiJja24zdWVpNGMxYjR2MnBtaGI5a216YmJkIn0.jrYVa77az9t2kplgJdgYmw`;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jackmichael-ward/cklmjvhp63wc317p79b13hsrs',
      center: [-87.909416, 43.041069],
      zoom: 3.75
    });
  }
}

import {GeoJson} from './geojson';

export interface GeoCollection {
    "type": string,
    "features": GeoJson[];
}
export interface GeoJson {
    "type": string,
    "geometry": {
        'type': string,
        "coordinates": number[]
    },
    "properties": {
        "name": string,
        "link": string
    }
}
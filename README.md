
# bte-projection

A javascript/typescript package that is a re-written version of [T++ mod](https://github.com/BuildTheEarth/terraplusplus)'s projection files.

## How to use

javascript:

```js
const { BTE_PROJECTION } = require('bte-projection')

let coordinate = { lat: 40.74843814459844, lon: -73.98566440289457 };

let converted = BTE_PROJECTION.fromGeo(coordinate);
let distortion = BTE_PROJECTION.getDistortion(coordinate);

console.log(`In-game X coordinate: ${converted.x}`);
console.log(`In-game Z coordinate: ${converted.y}`);
console.log(`Distortion amount: ${distortion.value}`);
```

typescript:

```ts
import { BTE_PROJECTION, XYCoord, GeoCoord } from 'bte-projection'

let coordinate: XYCoord = { x: -8525873.069135161, y: -6026164.9710848285 };
let converted: GeoCoord = BTE_PROJECTION.toGeo(coordinate);

console.log(`Latitude: ${converted.lat}`);
console.log(`Longitude: ${converted.lon}`);
```

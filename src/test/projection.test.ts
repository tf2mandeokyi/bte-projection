import { BTE_PROJECTION, GeoCoord, XYCoord } from "../";

const geo: GeoCoord = { lat: 40.74843814459844, lon: -73.98566440289457 };
const xy: XYCoord = { x: -8525873.069135161, y: -6026164.9710848285 };
const distortion = 1.05202546840082;

test('projection.fromGeo test', () => {
    let { x, y } = BTE_PROJECTION.fromGeo(geo);
    expect(x.toFixed(20)).toBe(xy.x.toFixed(20))
    expect(y.toFixed(20)).toBe(xy.y.toFixed(20))
})

test('projection.toGeo test', () => {
    let { lat, lon } = BTE_PROJECTION.toGeo(xy);
    expect(lat.toFixed(10)).toBe(geo.lat.toFixed(10))
    expect(lon.toFixed(10)).toBe(geo.lon.toFixed(10))
})

test('projection.getDistortion test', () => {
    let { value } = BTE_PROJECTION.getDistortion(geo);
    expect(value.toFixed(9)).toBe(distortion.toFixed(9))
})
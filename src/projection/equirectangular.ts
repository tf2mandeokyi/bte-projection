import { GeographicCoordinate, V2d } from "../util/math";
import { GeographicProjection } from "./geographic";
import { OutOfProjectionBoundsError } from "./oob";

export class EquirectangularProjection extends GeographicProjection {
    /**
     * Converts map coordinates to geographic coordinates
     *
     * @param x - x map coordinate
     * @param y - y map coordinate
     * @return {longitude, latitude} in degrees
     */
    toGeo({ x, y }: V2d) {
        let geo = { lon: x, lat: y };
        OutOfProjectionBoundsError.checkLongitudeLatitudeInRange(geo);
        return geo;
    }

    /**
     * Converts geographic coordinates to map coordinates
     *
     * @param longitude - longitude, in degrees
     * @param latitude  - latitude, in degrees
     * @return {x, y} map coordinates
     */
    fromGeo(coord: GeographicCoordinate) {
        OutOfProjectionBoundsError.checkLongitudeLatitudeInRange(coord);
        return { x: coord.lon, y: coord.lat };
    }

    /**
     * Gives an estimation of the scale of this projection.
     * This is just an estimation, as distortion is inevitable when projecting a sphere onto a flat surface,
     * so this value varies from places to places in reality.
     *
     * @return an estimation of the scale of this projection
     */
    metersPerUnit() {
        return 100000;
    }
}

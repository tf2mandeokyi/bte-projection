import { GeographicCoordinate, toRadians, V2d } from "../util/math";
import { EARTH_CIRCUMFERENCE, GeographicProjection } from "./geographic";
import { OutOfProjectionBoundsError } from "./oob";

export class SinusoidalProjection extends GeographicProjection {
    toGeo({ x, y }: V2d) {
        return { 
            lon: x / Math.cos(toRadians(y)), 
            lat: y
        };
    }

    fromGeo(coord: GeographicCoordinate) {
    	OutOfProjectionBoundsError.checkLongitudeLatitudeInRange(coord);
        return {
            x: coord.lon * Math.cos(toRadians(coord.lat)),
            y: coord.lat
        };
    }

    metersPerUnit() {
        return EARTH_CIRCUMFERENCE / 360.0; //gotta make good on that exact area
    }
}

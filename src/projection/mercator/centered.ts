import { GeoCoord, toDegrees, toRadians, XYCoord } from "../../util/math";
import { EARTH_CIRCUMFERENCE, GeographicProjection } from "../geographic";
import { OutOfProjectionBoundsError } from "../oob";
import { LIMIT_LATITUDE } from "./web";


export class CenteredMercatorProjection extends GeographicProjection {
    
    toGeo({ x, y }: XYCoord) {
        OutOfProjectionBoundsError.checkInRange(x, y, 1, 1);
        return {
                lat: x * 180.0,
                lon: toDegrees(Math.atan(Math.exp(-y * Math.PI)) * 2 - Math.PI / 2)
        };
    }

    fromGeo({ lat, lon }: GeoCoord) {
        OutOfProjectionBoundsError.checkInRange(lon, lat, 180, LIMIT_LATITUDE);
        return {
                x: lon / 180.0,
                y: -(Math.log(Math.tan((Math.PI / 2 + toRadians(lat)) / 2))) / Math.PI
        };
    }

    bounds() {
        return {
            minX: -1, minY: -1,
            maxX:  1, maxY:  1
        };
    }

    metersPerUnit() {
        return Math.cos(toRadians(30)) * EARTH_CIRCUMFERENCE / 2; //Accurate at about 30 degrees
    }

    upright() {
        return true;
    }
}
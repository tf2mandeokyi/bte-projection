import { GeoCoord, toDegrees, toRadians, XYCoord } from "../../util/math";
import { EARTH_CIRCUMFERENCE, GeographicProjection } from "../geographic";
import { OutOfProjectionBoundsError } from "../oob";

export class TransverseMercatorProjection extends GeographicProjection {
    /**
     * Width of a longitude range in radians.
     * The 360 degrees of longitude are divided into chunks of this size,
     * and each zone gets its own central meridian to use for the universal projection.
     */
    public static readonly ZONE_WIDTH = toRadians(6.0);

    private static readonly METERS_PER_UNIT = EARTH_CIRCUMFERENCE / (2 * Math.PI);

    /**
     * @param longitude - longitude in radians
     * @return the central meridian to use when projecting at the given longitude, in radians
     */
    static getCentralMeridian(longitude: number) {
        return (Math.floor(longitude / this.ZONE_WIDTH) + 0.5) * this.ZONE_WIDTH;
    }

    fromGeo(coord: GeoCoord) {
        OutOfProjectionBoundsError.checkLongitudeLatitudeInRange(coord);
        let lam = toRadians(coord.lon);
        let phi = toRadians(coord.lat);
        let centralMeridian = TransverseMercatorProjection.getCentralMeridian(lam);
        lam -= centralMeridian;

        let b = Math.cos(phi) * Math.sin(lam);
        let x = Math.log((1.0 + b) / (1.0 - b)) / 2;
        let y = Math.atan2(Math.tan(phi), Math.cos(lam));
        x += centralMeridian;
        return { x, y };
    }

    toGeo({ x, y }: XYCoord) {
        OutOfProjectionBoundsError.checkInRange(x, y, Math.PI, Math.PI / 2);
        let centralMeridian = TransverseMercatorProjection.getCentralMeridian(x);
        x -= centralMeridian;
        let lam = Math.atan2(Math.sinh(x), Math.cos(y)) + centralMeridian;
        let phi = Math.asin(Math.sin(y) / Math.cosh(x));
        let lon = toDegrees(lam);
        let lat = toDegrees(phi);
        return { lon, lat };
    }

    metersPerUnit() {
        return TransverseMercatorProjection.METERS_PER_UNIT;
    }
}
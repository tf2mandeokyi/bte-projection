import { GeographicProjection } from "../projection";
import { GeoCoord, TAU, toDegrees, toRadians, XYCoord } from "../../util/math";
import { OutOfProjectionBoundsError } from "../oob";
import { notNegative } from "../../util/validate";


export const LIMIT_LATITUDE = toDegrees(2 * Math.atan(Math.pow(Math.E, Math.PI)) - Math.PI / 2);


export class WebMercatorProjection extends GeographicProjection {

    protected zoom: number;

    protected scaleTo: number;
    protected scaleFrom: number;

    constructor({ zoom }: { zoom: number }) {
        super({});
        this.zoom = zoom != null ? notNegative(zoom, { message: "zoom" }) : 0;

        this.scaleTo = 1.0 / (256 << this.zoom);
        this.scaleFrom = 256 << this.zoom;
    }

    toGeo({ x, y }: XYCoord) {
        if (x < 0 || y < 0 || x > this.scaleFrom || y > this.scaleFrom) {
            throw new OutOfProjectionBoundsError();
        }
        return {
                lon: toDegrees(this.scaleTo * x * TAU - Math.PI),
                lat: toDegrees(Math.atan(Math.exp(Math.PI - this.scaleTo * y * TAU)) * 2 - Math.PI / 2)
        };
    }

    fromGeo({ lon, lat }: GeoCoord) {
        OutOfProjectionBoundsError.checkInRange(lon, lat, 180, LIMIT_LATITUDE);
        return {
                x: this.scaleFrom * (toRadians(lon) + Math.PI) / TAU,
                y: this.scaleFrom * (Math.PI - Math.log(Math.tan((Math.PI / 2 + toRadians(lat)) / 2))) / TAU
        };
    }

    bounds() {
        return { 
            minX: 0, maxX: this.scaleFrom, 
            minY: 0, maxY: this.scaleFrom 
        };
    }

    upright() {
        return true;
    }

    metersPerUnit() {
        return 100000;
    }
}
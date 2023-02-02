import { GeoCoord, XYCoord } from "../../util/math";
import { ProjectionTransform } from "./transform";


export class FlipHorizontalProjectionTransform extends ProjectionTransform {
    toGeo({ x, y }: XYCoord) {
        return this.delegate.toGeo({ x: -x, y });
    }

    fromGeo(coord: GeoCoord) {
        let p = this.delegate.fromGeo(coord);
        p.x = -p.x;
        return p;
    }

    upright() {
        return !this.delegate.upright();
    }

    bounds() {
        let b = this.delegate.bounds();
        return { 
            minX: -b.minX, 
            minY:  b.maxY, 
            maxX: -b.maxX, 
            maxY:  b.minY
        };
    }
}
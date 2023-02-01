import { GeographicCoordinate, V2d } from "../../util/math";
import { ProjectionTransform } from "./transform";


export class FlipHorizontalProjectionTransform extends ProjectionTransform {
    toGeo({ x, y }: V2d) {
        return this.delegate.toGeo({ x: -x, y });
    }

    fromGeo(coord: GeographicCoordinate) {
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
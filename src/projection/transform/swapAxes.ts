import { GeographicCoordinate, V2d } from "../../util/math";
import { ProjectionTransform } from "./transform";

export class SwapAxesProjectionTransform extends ProjectionTransform {

    toGeo({ x, y }: V2d) {
        return this.delegate.toGeo({ x: y, y: x });
    }

    fromGeo(coord: GeographicCoordinate) {
        let p = this.delegate.fromGeo(coord);
        let t = p.x;
        p.x = p.y;
        p.y = t;
        return p;
    }

    bounds() {
        let b = this.delegate.bounds();
        return {
            minX: b.minY, minY: b.minX,
            maxX: b.maxY, maxY: b.maxX
        };
    }
}

import { GeoCoord, XYCoord } from "../../util/math";
import { checkTrue } from "../../util/validate";
import { GeographicProjection } from "../projection";
import { ProjectionTransform } from "./transform";


export class OffsetProjectionTransform extends ProjectionTransform {
    private dx: number;
    private dy: number;

    /**
     * @param delegate - Input projection
     * @param dx       - how much to move along the X axis
     * @param dy       - how much to move along the Y axis
     */
    constructor({ delegate, dx, dy }: { delegate: GeographicProjection, dx: number, dy: number }) {
        super({ delegate });
        checkTrue(isFinite(dx) && isFinite(dy), "Projection offsets have to be finite doubles");
        this.dx = dx;
        this.dy = dy;
    }

    bounds() {
        let b = this.delegate.bounds();
        b.minX += this.dx;
        b.minY += this.dy;
        b.maxX += this.dx;
        b.maxY += this.dy;
        return b;
    }

    toGeo({ x, y }: XYCoord) {
        return this.delegate.toGeo({ x: x - this.dx, y: y - this.dy });
    }

    fromGeo(coord: GeoCoord) {
        let pos = this.delegate.fromGeo(coord);
        pos.x += this.dx;
        pos.y += this.dy;
        return pos;
    }
}

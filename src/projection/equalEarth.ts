import { GeoCoord, ROOT3, toDegrees, toRadians, XYCoord } from "../util/math";
import { EARTH_CIRCUMFERENCE, GeographicProjection } from "./geographic";
import { OutOfProjectionBoundsError } from "./oob";


const A1 = 1.340264;
const A2 = -0.081106;
const A3 = 0.000893;
const A4 = 0.003796;

export class EqualEarthProjection extends GeographicProjection {


    toGeo({ x, y }: XYCoord) {

        let theta = y / A1; //start with initial guess at y/A1 since A1 is by far the largest term

        //Using newtons method to find theta
        let newton = 5;
        for (let i = 0; i < newton; i++) {
            let tpow = theta;

            //calculate a pseudo-y - goal and pseduo-dy/dt at theta to use newtons method root finding
            let pdy = A1; //A1
            let py = A1 * tpow - y; //A1 t - goal
            pdy += 3 * A2 * (tpow *= theta); //3 A2 t^2
            py += A2 * (tpow *= theta); //A2 t^3
            pdy += 7 * A3 * (tpow *= theta * theta * theta); //7 A3 t^6
            py += A3 * (tpow *= theta); //A3 t^7
            pdy += 9 * A4 * (tpow *= theta); //9 A4 t^8
            py += A4 * (tpow *= theta); //A4 t^9

            //x = dx/dy
            theta -= py / pdy;
        }

        let thetasquare = theta * theta;
        let tpow = thetasquare;

        //recalc x denomenator to solve for lon
        let dx = A1; //A1
        dx += 3 * A2 * tpow; //3 A2 t^2
        dx += 7 * A3 * (tpow *= thetasquare * thetasquare); //7 A3 t^6
        dx += 9 * A4 * (tpow *= thetasquare); //9 A4 t^8

        return { 
            lat: toDegrees(x * dx * 3 / (2 * ROOT3 * Math.cos(theta))),
            lon: toDegrees(Math.asin(Math.sin(theta) * 2 / ROOT3)) 
        };
    }

    fromGeo(coord: GeoCoord) {
    	OutOfProjectionBoundsError.checkLongitudeLatitudeInRange(coord);

        let sintheta = ROOT3 * Math.sin(toRadians(coord.lat)) / 2;
        let theta = Math.asin(sintheta);
        let tpow = theta;

        let x = A1; //A1
        let y = A1 * tpow; //A1 t
        x += 3 * A2 * (tpow *= theta); //3 A2 t^2
        y += A2 * (tpow *= theta); //A2 t^3
        x += 7 * A3 * (tpow *= theta * theta * theta); //7 A3 t^6
        y += A3 * (tpow *= theta); //A3 t^7
        x += 9 * A4 * (tpow *= theta); //9 A4 t^8
        y += A4 * (tpow *= theta); //A4 t^9

        let costheta = Math.sqrt(1 - sintheta * sintheta);

        return { 
            x: (2 * ROOT3 * toRadians(coord.lon) * costheta / 3) / x, 
            y
        };
    }

    metersPerUnit() {
        return EARTH_CIRCUMFERENCE / (2 * this.bounds().maxX);
    }
}
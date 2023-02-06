import { BTEDymaxionProjection } from "../projection/dymaxion/bte"
import { ConformalDymaxionProjection } from "../projection/dymaxion/conformal"
import { DymaxionProjection } from "../projection/dymaxion/dymaxion"
import { EqualEarthProjection } from "../projection/equalEarth"
import { EquirectangularProjection } from "../projection/equirectangular"
import { CenteredMercatorProjection } from "../projection/mercator/centered"
import { TransverseMercatorProjection } from "../projection/mercator/transverse"
import { WebMercatorProjection } from "../projection/mercator/web"
import { GeographicProjection } from "../projection/projection"
import { SinusoidalProjection } from "../projection/sinusoidal"
import { FlipHorizontalProjectionTransform } from "../projection/transform/flipHorizontal"
import { FlipVerticalProjectionTransform } from "../projection/transform/flipVertical"
import { OffsetProjectionTransform } from "../projection/transform/offset"
import { ScaleProjectionTransform } from "../projection/transform/scale"
import { SwapAxesProjectionTransform } from "../projection/transform/swapAxes"


type PickOne<T> = { [P in keyof T]: Record<P, T[P]> & Partial<Record<Exclude<keyof T, P>, undefined>> }[keyof T]
type GeographicProjectionParameterJSON<T> = {
    [ K in keyof T ]: T[K] extends GeographicProjection ? (ProjectionJSON | GeographicProjection) : T[K]
}


let projectionMap = {
    'centered_mercator': CenteredMercatorProjection,
    'web_mercator': WebMercatorProjection,
    'transverse_mercator': TransverseMercatorProjection,
    'equirectangular': EquirectangularProjection,
    'sinusoidal': SinusoidalProjection,
    'equal_earth': EqualEarthProjection,
    'bte_conformal_dymaxion': BTEDymaxionProjection,
    'dymaxion': DymaxionProjection,
    'conformal_dymaxion': ConformalDymaxionProjection,
    
    //transformations
    'flip_horizontal': FlipHorizontalProjectionTransform,
    'flip_vertical': FlipVerticalProjectionTransform,
    'offset': OffsetProjectionTransform,
    'scale': ScaleProjectionTransform,
    'swap_axes': SwapAxesProjectionTransform
}


export type ProjectionJSON = PickOne<{
    [ K in keyof typeof projectionMap ]: GeographicProjectionParameterJSON<
        NonNullable<ConstructorParameters<typeof projectionMap[K]>[0]>
    >
}>;


/**
 * Converts projection JSON into GeographicProjection class
 */
export function fromProjectionJSON(param: ProjectionJSON | string) : GeographicProjection {
    if(typeof param === 'string') param = JSON.parse(param) as ProjectionJSON;

    let projectionType = Object.keys(param)[0] as keyof typeof projectionMap;
    let projectionClass = projectionMap[projectionType];
    let constructorParam = param[projectionType] as any;
    for(let key in constructorParam) {
        let value = constructorParam[key];
        if(typeof value === 'object') {
            if(value instanceof GeographicProjection) continue;
            constructorParam[key] = fromProjectionJSON(value);
        }
    }
    return new projectionClass(constructorParam);
}
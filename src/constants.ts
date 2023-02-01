import { BTEDymaxionProjection } from "./projection/dymaxion/bte";
import { FlipVerticalProjectionTransform } from "./projection/transform/flipVertical";
import { ScaleProjectionTransform } from "./projection/transform/scale";

export const BTE_PROJECTION = new ScaleProjectionTransform(
    new FlipVerticalProjectionTransform(
        new BTEDymaxionProjection()
    ), 7318261.522857145, 7318261.522857145
);
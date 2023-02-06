import { fromProjectionJSON } from "./parser";


export const BTE_PROJECTION = fromProjectionJSON({
    scale: {
        delegate: {
            flip_vertical: {
                delegate: {
                    bte_conformal_dymaxion: {}
                }
            }
        },
        x: 7318261.522857145,
        y: 7318261.522857145
    }
});
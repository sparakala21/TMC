import { Schema } from '../schema';
import { WageSetting } from './wageSetting';
/** Represents an update request for the `WageSetting` object describing a `TeamMember`. */
export interface UpdateWageSettingRequest {
    /** An object representing a team member's wage information. */
    wageSetting: WageSetting;
}
export declare const updateWageSettingRequestSchema: Schema<UpdateWageSettingRequest>;

import { Schema } from '../schema';
import { Error } from './error';
import { WageSetting } from './wageSetting';
/**
 * Represents a response from an update request containing the updated `WageSetting` object
 * or error messages.
 */
export interface UpdateWageSettingResponse {
    /** An object representing a team member's wage information. */
    wageSetting?: WageSetting;
    /** The errors that occurred during the request. */
    errors?: Error[];
}
export declare const updateWageSettingResponseSchema: Schema<UpdateWageSettingResponse>;

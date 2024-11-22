import { Schema } from '../schema';
import { UpdateTeamMemberRequest } from './updateTeamMemberRequest';
/** Represents a bulk update request for `TeamMember` objects. */
export interface BulkUpdateTeamMembersRequest {
    /** The data used to update the `TeamMember` objects. Each key is the `team_member_id` that maps to the `UpdateTeamMemberRequest`. The maximum number of update objects is 25. */
    teamMembers: Record<string, UpdateTeamMemberRequest>;
}
export declare const bulkUpdateTeamMembersRequestSchema: Schema<BulkUpdateTeamMembersRequest>;

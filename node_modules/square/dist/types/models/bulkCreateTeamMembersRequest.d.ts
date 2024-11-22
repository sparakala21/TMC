import { Schema } from '../schema';
import { CreateTeamMemberRequest } from './createTeamMemberRequest';
/** Represents a bulk create request for `TeamMember` objects. */
export interface BulkCreateTeamMembersRequest {
    /** The data used to create the `TeamMember` objects. Each key is the `idempotency_key` that maps to the `CreateTeamMemberRequest`. The maximum number of create objects is 25. */
    teamMembers: Record<string, CreateTeamMemberRequest>;
}
export declare const bulkCreateTeamMembersRequestSchema: Schema<BulkCreateTeamMembersRequest>;

import { ApiResponse, RequestOptions } from '../core';
import { BulkCreateTeamMembersRequest } from '../models/bulkCreateTeamMembersRequest';
import { BulkCreateTeamMembersResponse } from '../models/bulkCreateTeamMembersResponse';
import { BulkUpdateTeamMembersRequest } from '../models/bulkUpdateTeamMembersRequest';
import { BulkUpdateTeamMembersResponse } from '../models/bulkUpdateTeamMembersResponse';
import { CreateTeamMemberRequest } from '../models/createTeamMemberRequest';
import { CreateTeamMemberResponse } from '../models/createTeamMemberResponse';
import { RetrieveTeamMemberResponse } from '../models/retrieveTeamMemberResponse';
import { RetrieveWageSettingResponse } from '../models/retrieveWageSettingResponse';
import { SearchTeamMembersRequest } from '../models/searchTeamMembersRequest';
import { SearchTeamMembersResponse } from '../models/searchTeamMembersResponse';
import { UpdateTeamMemberRequest } from '../models/updateTeamMemberRequest';
import { UpdateTeamMemberResponse } from '../models/updateTeamMemberResponse';
import { UpdateWageSettingRequest } from '../models/updateWageSettingRequest';
import { UpdateWageSettingResponse } from '../models/updateWageSettingResponse';
import { BaseApi } from './baseApi';
export declare class TeamApi extends BaseApi {
    /**
     * Creates a single `TeamMember` object. The `TeamMember` object is returned on successful creates.
     * You must provide the following values in your request to this endpoint:
     * - `given_name`
     * - `family_name`
     *
     * Learn about [Troubleshooting the Team API](https://developer.squareup.
     * com/docs/team/troubleshooting#createteammember).
     *
     * @param body         An object containing the fields to POST for the request.
     *                                                       See the corresponding object definition for field details.
     * @return Response from the API call
     */
    createTeamMember(body: CreateTeamMemberRequest, requestOptions?: RequestOptions): Promise<ApiResponse<CreateTeamMemberResponse>>;
    /**
     * Creates multiple `TeamMember` objects. The created `TeamMember` objects are returned on successful
     * creates.
     * This process is non-transactional and processes as much of the request as possible. If one of the
     * creates in
     * the request cannot be successfully processed, the request is not marked as failed, but the body of
     * the response
     * contains explicit error information for the failed create.
     *
     * Learn about [Troubleshooting the Team API](https://developer.squareup.
     * com/docs/team/troubleshooting#bulk-create-team-members).
     *
     * @param body         An object containing the fields to POST for the
     *                                                            request.  See the corresponding object definition for
     *                                                            field details.
     * @return Response from the API call
     */
    bulkCreateTeamMembers(body: BulkCreateTeamMembersRequest, requestOptions?: RequestOptions): Promise<ApiResponse<BulkCreateTeamMembersResponse>>;
    /**
     * Updates multiple `TeamMember` objects. The updated `TeamMember` objects are returned on successful
     * updates.
     * This process is non-transactional and processes as much of the request as possible. If one of the
     * updates in
     * the request cannot be successfully processed, the request is not marked as failed, but the body of
     * the response
     * contains explicit error information for the failed update.
     * Learn about [Troubleshooting the Team API](https://developer.squareup.
     * com/docs/team/troubleshooting#bulk-update-team-members).
     *
     * @param body         An object containing the fields to POST for the
     *                                                            request.  See the corresponding object definition for
     *                                                            field details.
     * @return Response from the API call
     */
    bulkUpdateTeamMembers(body: BulkUpdateTeamMembersRequest, requestOptions?: RequestOptions): Promise<ApiResponse<BulkUpdateTeamMembersResponse>>;
    /**
     * Returns a paginated list of `TeamMember` objects for a business.
     * The list can be filtered by the following:
     * - location IDs
     * - `status`
     *
     * @param body         An object containing the fields to POST for the request.
     *                                                        See the corresponding object definition for field details.
     * @return Response from the API call
     */
    searchTeamMembers(body: SearchTeamMembersRequest, requestOptions?: RequestOptions): Promise<ApiResponse<SearchTeamMembersResponse>>;
    /**
     * Retrieves a `TeamMember` object for the given `TeamMember.id`.
     * Learn about [Troubleshooting the Team API](https://developer.squareup.
     * com/docs/team/troubleshooting#retrieve-a-team-member).
     *
     * @param teamMemberId   The ID of the team member to retrieve.
     * @return Response from the API call
     */
    retrieveTeamMember(teamMemberId: string, requestOptions?: RequestOptions): Promise<ApiResponse<RetrieveTeamMemberResponse>>;
    /**
     * Updates a single `TeamMember` object. The `TeamMember` object is returned on successful updates.
     * Learn about [Troubleshooting the Team API](https://developer.squareup.
     * com/docs/team/troubleshooting#update-a-team-member).
     *
     * @param teamMemberId   The ID of the team member to update.
     * @param body           An object containing the fields to POST for the request.
     *                                                         See the corresponding object definition for field details.
     * @return Response from the API call
     */
    updateTeamMember(teamMemberId: string, body: UpdateTeamMemberRequest, requestOptions?: RequestOptions): Promise<ApiResponse<UpdateTeamMemberResponse>>;
    /**
     * Retrieves a `WageSetting` object for a team member specified
     * by `TeamMember.id`.
     * Learn about [Troubleshooting the Team API](https://developer.squareup.
     * com/docs/team/troubleshooting#retrievewagesetting).
     *
     * @param teamMemberId   The ID of the team member for which to retrieve the wage setting.
     * @return Response from the API call
     */
    retrieveWageSetting(teamMemberId: string, requestOptions?: RequestOptions): Promise<ApiResponse<RetrieveWageSettingResponse>>;
    /**
     * Creates or updates a `WageSetting` object. The object is created if a
     * `WageSetting` with the specified `team_member_id` does not exist. Otherwise,
     * it fully replaces the `WageSetting` object for the team member.
     * The `WageSetting` is returned on a successful update.
     * Learn about [Troubleshooting the Team API](https://developer.squareup.
     * com/docs/team/troubleshooting#create-or-update-a-wage-setting).
     *
     * @param teamMemberId   The ID of the team member for which to update the
     *                                                          `WageSetting` object.
     * @param body           An object containing the fields to POST for the request.
     *                                                          See the corresponding object definition for field
     *                                                          details.
     * @return Response from the API call
     */
    updateWageSetting(teamMemberId: string, body: UpdateWageSettingRequest, requestOptions?: RequestOptions): Promise<ApiResponse<UpdateWageSettingResponse>>;
}

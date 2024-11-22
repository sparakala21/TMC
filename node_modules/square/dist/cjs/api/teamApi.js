"use strict";
exports.__esModule = true;
exports.TeamApi = void 0;
var tslib_1 = require("tslib");
var bulkCreateTeamMembersRequest_1 = require("../models/bulkCreateTeamMembersRequest");
var bulkCreateTeamMembersResponse_1 = require("../models/bulkCreateTeamMembersResponse");
var bulkUpdateTeamMembersRequest_1 = require("../models/bulkUpdateTeamMembersRequest");
var bulkUpdateTeamMembersResponse_1 = require("../models/bulkUpdateTeamMembersResponse");
var createTeamMemberRequest_1 = require("../models/createTeamMemberRequest");
var createTeamMemberResponse_1 = require("../models/createTeamMemberResponse");
var retrieveTeamMemberResponse_1 = require("../models/retrieveTeamMemberResponse");
var retrieveWageSettingResponse_1 = require("../models/retrieveWageSettingResponse");
var searchTeamMembersRequest_1 = require("../models/searchTeamMembersRequest");
var searchTeamMembersResponse_1 = require("../models/searchTeamMembersResponse");
var updateTeamMemberRequest_1 = require("../models/updateTeamMemberRequest");
var updateTeamMemberResponse_1 = require("../models/updateTeamMemberResponse");
var updateWageSettingRequest_1 = require("../models/updateWageSettingRequest");
var updateWageSettingResponse_1 = require("../models/updateWageSettingResponse");
var schema_1 = require("../schema");
var baseApi_1 = require("./baseApi");
var TeamApi = /** @class */ (function (_super) {
    tslib_1.__extends(TeamApi, _super);
    function TeamApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    TeamApi.prototype.createTeamMember = function (body, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, mapped;
            return tslib_1.__generator(this, function (_a) {
                req = this.createRequest('POST', '/v2/team-members');
                mapped = req.prepareArgs({
                    body: [body, createTeamMemberRequest_1.createTeamMemberRequestSchema]
                });
                req.header('Content-Type', 'application/json');
                req.json(mapped.body);
                req.authenticate([{ global: true }]);
                return [2 /*return*/, req.callAsJson(createTeamMemberResponse_1.createTeamMemberResponseSchema, requestOptions)];
            });
        });
    };
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
    TeamApi.prototype.bulkCreateTeamMembers = function (body, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, mapped;
            return tslib_1.__generator(this, function (_a) {
                req = this.createRequest('POST', '/v2/team-members/bulk-create');
                mapped = req.prepareArgs({
                    body: [body, bulkCreateTeamMembersRequest_1.bulkCreateTeamMembersRequestSchema]
                });
                req.header('Content-Type', 'application/json');
                req.json(mapped.body);
                req.authenticate([{ global: true }]);
                return [2 /*return*/, req.callAsJson(bulkCreateTeamMembersResponse_1.bulkCreateTeamMembersResponseSchema, requestOptions)];
            });
        });
    };
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
    TeamApi.prototype.bulkUpdateTeamMembers = function (body, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, mapped;
            return tslib_1.__generator(this, function (_a) {
                req = this.createRequest('POST', '/v2/team-members/bulk-update');
                mapped = req.prepareArgs({
                    body: [body, bulkUpdateTeamMembersRequest_1.bulkUpdateTeamMembersRequestSchema]
                });
                req.header('Content-Type', 'application/json');
                req.json(mapped.body);
                req.authenticate([{ global: true }]);
                return [2 /*return*/, req.callAsJson(bulkUpdateTeamMembersResponse_1.bulkUpdateTeamMembersResponseSchema, requestOptions)];
            });
        });
    };
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
    TeamApi.prototype.searchTeamMembers = function (body, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, mapped;
            return tslib_1.__generator(this, function (_a) {
                req = this.createRequest('POST', '/v2/team-members/search');
                mapped = req.prepareArgs({
                    body: [body, searchTeamMembersRequest_1.searchTeamMembersRequestSchema]
                });
                req.header('Content-Type', 'application/json');
                req.json(mapped.body);
                req.authenticate([{ global: true }]);
                return [2 /*return*/, req.callAsJson(searchTeamMembersResponse_1.searchTeamMembersResponseSchema, requestOptions)];
            });
        });
    };
    /**
     * Retrieves a `TeamMember` object for the given `TeamMember.id`.
     * Learn about [Troubleshooting the Team API](https://developer.squareup.
     * com/docs/team/troubleshooting#retrieve-a-team-member).
     *
     * @param teamMemberId   The ID of the team member to retrieve.
     * @return Response from the API call
     */
    TeamApi.prototype.retrieveTeamMember = function (teamMemberId, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, mapped;
            return tslib_1.__generator(this, function (_a) {
                req = this.createRequest('GET');
                mapped = req.prepareArgs({ teamMemberId: [teamMemberId, (0, schema_1.string)()] });
                req.appendTemplatePath(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["/v2/team-members/", ""], ["/v2/team-members/", ""])), mapped.teamMemberId);
                req.authenticate([{ global: true }]);
                return [2 /*return*/, req.callAsJson(retrieveTeamMemberResponse_1.retrieveTeamMemberResponseSchema, requestOptions)];
            });
        });
    };
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
    TeamApi.prototype.updateTeamMember = function (teamMemberId, body, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, mapped;
            return tslib_1.__generator(this, function (_a) {
                req = this.createRequest('PUT');
                mapped = req.prepareArgs({
                    teamMemberId: [teamMemberId, (0, schema_1.string)()],
                    body: [body, updateTeamMemberRequest_1.updateTeamMemberRequestSchema]
                });
                req.header('Content-Type', 'application/json');
                req.json(mapped.body);
                req.appendTemplatePath(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["/v2/team-members/", ""], ["/v2/team-members/", ""])), mapped.teamMemberId);
                req.authenticate([{ global: true }]);
                return [2 /*return*/, req.callAsJson(updateTeamMemberResponse_1.updateTeamMemberResponseSchema, requestOptions)];
            });
        });
    };
    /**
     * Retrieves a `WageSetting` object for a team member specified
     * by `TeamMember.id`.
     * Learn about [Troubleshooting the Team API](https://developer.squareup.
     * com/docs/team/troubleshooting#retrievewagesetting).
     *
     * @param teamMemberId   The ID of the team member for which to retrieve the wage setting.
     * @return Response from the API call
     */
    TeamApi.prototype.retrieveWageSetting = function (teamMemberId, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, mapped;
            return tslib_1.__generator(this, function (_a) {
                req = this.createRequest('GET');
                mapped = req.prepareArgs({ teamMemberId: [teamMemberId, (0, schema_1.string)()] });
                req.appendTemplatePath(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["/v2/team-members/", "/wage-setting"], ["/v2/team-members/", "/wage-setting"])), mapped.teamMemberId);
                req.authenticate([{ global: true }]);
                return [2 /*return*/, req.callAsJson(retrieveWageSettingResponse_1.retrieveWageSettingResponseSchema, requestOptions)];
            });
        });
    };
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
    TeamApi.prototype.updateWageSetting = function (teamMemberId, body, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, mapped;
            return tslib_1.__generator(this, function (_a) {
                req = this.createRequest('PUT');
                mapped = req.prepareArgs({
                    teamMemberId: [teamMemberId, (0, schema_1.string)()],
                    body: [body, updateWageSettingRequest_1.updateWageSettingRequestSchema]
                });
                req.header('Content-Type', 'application/json');
                req.json(mapped.body);
                req.appendTemplatePath(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["/v2/team-members/", "/wage-setting"], ["/v2/team-members/", "/wage-setting"])), mapped.teamMemberId);
                req.authenticate([{ global: true }]);
                return [2 /*return*/, req.callAsJson(updateWageSettingResponse_1.updateWageSettingResponseSchema, requestOptions)];
            });
        });
    };
    return TeamApi;
}(baseApi_1.BaseApi));
exports.TeamApi = TeamApi;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=teamApi.js.map
"use strict";
/**
 * Ketch-agent defines the interfaces that implementations should conform to for executing custom scripts as part of Ketch Rights Workflow.  The implementations are invoked by Agent which runs as part of the Transponder.
 *
 * Agent provides the ability to run custom nodejs scripts within your environment as part of a Data Subject Rights (DSR) request orchestrated by Ketch.  Agent sets up the execution environment and calls the HandleRequest function with arguments as defined in this package.
 *
 * Implementations can consume the interfaces defined here and must not be concerned with how these interfaces are implemented by the Agent
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestStatusReason = exports.RequestStatus = exports.DSRKind = void 0;
var DSRKind;
(function (DSRKind) {
    DSRKind["AccessRequestKind"] = "AccessRequest";
    DSRKind["AccessResponseKind"] = "AccessResponse";
    DSRKind["AccessStatusEventKind"] = "AccessStatusEvent";
    DSRKind["ConsentRequestKind"] = "ConsentRequest";
    DSRKind["CorrectionRequestKind"] = "CorrectionRequest";
    DSRKind["CorrectionResponseKind"] = "CorrectionResponse";
    DSRKind["CorrectionStatusEventKind"] = "CorrectionStatusEvent";
    DSRKind["DeleteRequestKind"] = "DeleteRequest";
    DSRKind["DeleteResponseKind"] = "DeleteResponse";
    DSRKind["DeleteStatusEventKind"] = "DeleteStatusEvent";
    DSRKind["RestrictProcessingRequestKind"] = "RestrictProcessingRequest";
    DSRKind["RestrictProcessingResponseKind"] = "RestrictProcessingResponse";
    DSRKind["RestrictProcessingStatusEventKind"] = "RestrictProcessingStatusEvent";
    DSRKind["SubscriptionControlRequestKind"] = "SubscriptionControlRequest";
    DSRKind["SubscriptionTopicRequestKind"] = "SubscriptionTopicRequest";
    DSRKind["ErrorKind"] = "Error";
})(DSRKind = exports.DSRKind || (exports.DSRKind = {}));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["UnknownRequestStatus"] = "unknown";
    RequestStatus["PendingRequestStatus"] = "pending";
    RequestStatus["InProgressRequestStatus"] = "in_progress";
    RequestStatus["CompletedRequestStatus"] = "completed";
    RequestStatus["CancelledRequestStatus"] = "cancelled";
    RequestStatus["DeniedRequestStatus"] = "denied";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
var RequestStatusReason;
(function (RequestStatusReason) {
    RequestStatusReason["UnknownRequestStatusReason"] = "unknown";
    RequestStatusReason["NeedUserVerificationRequestStatusReason"] = "need_user_verification";
    RequestStatusReason["Requested"] = "requested";
    RequestStatusReason["InsufficientIdentification"] = "insufficient_identification";
    RequestStatusReason["Executed"] = "executed";
    RequestStatusReason["SuspectedFraudRequestStatusReason"] = "`suspected_fraud`";
    RequestStatusReason["InsufficientVerificationRequestStatusReason"] = "insufficient_verification";
    RequestStatusReason["NoMatchRequestStatusReason"] = "no_match";
    RequestStatusReason["ClaimNotCoveredRequestStatusReason"] = "claim_not_covered";
    RequestStatusReason["OutsideJurisdictionRequestStatusReason"] = "outside_jurisdiction";
    RequestStatusReason["TooManyRequestsRequestStatusReason"] = "too_many_requests";
    RequestStatusReason["OtherRequestStatusReason"] = "other";
})(RequestStatusReason = exports.RequestStatusReason || (exports.RequestStatusReason = {}));

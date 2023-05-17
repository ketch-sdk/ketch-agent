/**
 * Ketch-agent defines the interfaces that implementations should conform to for executing custom scripts as part of Ketch Rights Workflow.  The implementations are invoked by Agent which runs as part of the Transponder.
 *
 * Agent provides the ability to run custom nodejs scripts within your environment as part of a Data Subject Rights (DSR) request orchestrated by Ketch.  Agent sets up the execution environment and calls the HandleRequest function with arguments as defined in this package.
 *
 * Implementations can consume the interfaces defined here and must not be concerned with how these interfaces are implemented by the Agent
 *
 * @packageDocumentation
 */


export interface ConnectionConfig {
    [key: string]: string
}

export interface AgentAPI {
    AccessData(data: any): void
}

export enum DSRKind {
    AccessRequestKind = "AccessRequest",
    AccessResponseKind = "AccessResponse",
    AccessStatusEventKind = "AccessStatusEvent",
    ConsentRequestKind = "ConsentRequest",
    CorrectionRequestKind = "CorrectionRequest",
    CorrectionResponseKind = "CorrectionResponse",
    CorrectionStatusEventKind = "CorrectionStatusEvent",
    DeleteRequestKind = "DeleteRequest",
    DeleteResponseKind = "DeleteResponse",
    DeleteStatusEventKind = "DeleteStatusEvent",
    RestrictProcessingRequestKind = "RestrictProcessingRequest",
    RestrictProcessingResponseKind = "RestrictProcessingResponse",
    RestrictProcessingStatusEventKind = "RestrictProcessingStatusEvent",
    SubscriptionControlRequestKind = "SubscriptionControlRequest",
    SubscriptionTopicRequestKind = "SubscriptionTopicRequest",
    ErrorKind = "Error",
}

export enum RequestStatus {
    UnknownRequestStatus = "unknown",
    PendingRequestStatus = "pending",
    InProgressRequestStatus = "in_progress",
    CompletedRequestStatus = "completed",
    CancelledRequestStatus = "cancelled",
    DeniedRequestStatus = "denied",
}

export enum RequestStatusReason {
    UnknownRequestStatusReason = "unknown",
    NeedUserVerificationRequestStatusReason = "need_user_verification",
    Requested = "requested",
    InsufficientIdentification = "insufficient_identification",
    Executed = "executed",
    SuspectedFraudRequestStatusReason = "`suspected_fraud`",
    InsufficientVerificationRequestStatusReason = "insufficient_verification",
    NoMatchRequestStatusReason = "no_match",
    ClaimNotCoveredRequestStatusReason = "claim_not_covered",
    OutsideJurisdictionRequestStatusReason = "outside_jurisdiction",
    TooManyRequestsRequestStatusReason = "too_many_requests",
    OtherRequestStatusReason = "other",
}

export interface Metadata {
    uid: string
    tenant: string
}

export interface Subject {
    email: string,
    firstName: string,
    lastName: string,
    addressLine1: string
    addressLine2: string,
    city: string,
    stateRegionCode: string,
    postalCode: string,
    countryCode: string,
    description: string
}

export interface Identity {
    identitySpace: string,
    identityFormat: string,
    identityValue: string
}


export interface Callback {
    url: string
    headers: Map<string, string>
}


export interface RequestData {
    controller: string
    property: string,
    environment: string,
    regulation: string,
    jurisdiction: string,
    identities: Array<Identity>,
    callbacks: Array<Callback>,
    subject: Subject
    context: Map<string, any>
    submittedTimestamp: Date,
    dueTimestamp: Date
}

export interface Credentials {
    connectionCode: string
    providerCode: string
    config: Map<string, any>
}

/**
 * DSRRequest represents
 */
export interface DSRRequest {
    apiVersion: string
    kind: DSRKind
    metadata: Metadata
    request: RequestData
    credentials: Credentials
}

export interface ResponseData {
    status: RequestStatus,
    reason: RequestStatusReason,
    expectedCompletionTimestamp: number,
    requestID?: string
    identities: Array<Identity>,
    subject: Subject,
    context: Map<string, any>
}

export interface DSRResponse {
    apiVersion: string
    kind: DSRKind
    metadata: Metadata
    event: ResponseData
}



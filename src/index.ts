/**
 * Ketch-agent defines the interfaces that implementations should conform to for executing custom scripts as part of
 * Ketch Rights Workflow.  The implementations are invoked by Agent which runs as part of the Transponder.
 *
 * Agent provides the ability to run custom nodejs scripts within your environment as part of a
 * Data Subject Rights (DSR) request orchestrated by Ketch.  Agent sets up the execution environment and calls the
 * HandleRequest function with arguments as defined in this package.
 *
 * Implementations can consume the interfaces defined here and must not be concerned with how these interfaces are
 * implemented by the Agent
 *
 * @packageDocumentation
 */

/**
 * HandleRequest is the entrypoint which will be invoked by the Agent.
 */
export type HandleRequest = (request: DsrRequest, connectionConfig: ConnectionConfig) => Promise<DsrResponse>

export type DSRVersion = 'dsr/v1'

/**
 * The status of the Data Subject Request.
 */
export type RequestStatus = 'unknown' | 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'denied'

/**
 * The reason for the status of the Data Subject Request.
 */
export type RequestStatusReason =
  | 'unknown'
  | 'need_user_verification'
  | 'requested'
  | 'insufficient_identification'
  | 'executed'
  | '`suspected_fraud`'
  | 'insufficient_verification'
  | 'no_match'
  | 'claim_not_covered'
  | 'outside_jurisdiction'
  | 'too_many_requests'
  | 'other'

/**
 * Kind of the request and response. Also used in type narrowing.
 */
export type Kind =
  | 'AccessRequest'
  | 'AccessResponse'
  | 'AccessStatusEvent'
  | 'DeleteRequest'
  | 'DeleteResponse'
  | 'DeleteStatusEvent'

/**
 * The Identity object describes the identity of a Data Subject.
 */
export interface Identity {
  identitySpace: string
  identityFormat: string
  identityValue: string
}

/**
 * The Callback object defines a URL and associated headers to be used for communicating information. The protocol for
 * communicating with the Callback is defined for every object that uses the Callback.
 */
export interface Callback {
  url: string
  headers: { [key: string]: string }
}

/**
 * The Document object defines a way of providing document data to the Ketch platform. The Document object can look like
 * a Callback object which allows Ketch to download the document using a simple HTTP GET.
 */
export interface Document extends Callback {
  data: string
}

/**
 * The Subject object describes the Data Subject making the request. The fields type, email, city, and description are
 * read only. Any empty subject values will be ignored when patching the subject. Additional properties may exist
 * in this object depending on the subject type.
 */
export interface DataSubject {
  type: string
  email: string
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2: string
  city: string
  stateRegionCode: string
  postalCode: string
  countryCode: string
  description: string
  phone: string
  formData: { [key: string]: string }
}

export interface Metadata {
  uid: string
  tenant: string
}

/**
 * An Access Request is initiated when a Data Subject invokes a right that allows Access/Portability of personal data.
 */
export interface AccessRequest {
  apiVersion: DSRVersion
  kind: Kind
  metadata: Metadata
  request: {
    controller: string
    property: string
    environment: string
    regulation: string
    jurisdiction: string
    identities: Identity[]
    callbacks: Callback[]
    subject: DataSubject
    context: { [key: string]: any }
    submittedTimestamp: number
    dueTimestamp: number
  }
}

export interface AccessResponseBody {
  status: string
  reason: string
  expectedCompletionTimestamp: number
  redirectUrl: string
  requestId: string
  documents: Document[]
  context: { [key: string]: any }
  subject: DataSubject
  identities: Identity[]
}

/**
 * A successful response MUST include the 200 OK response status code and a AccessResponse JSON object.
 */
export interface AccessResponse {
  apiVersion: DSRVersion
  kind: Kind
  metadata: Metadata
  responseBody: AccessResponseBody
}

/**
 * When the status of Access Request has changed, a AccessStatusEvent event JSON object should be sent to all the
 * callbacks specified in the request. The results and documents are merged with any cached results from previous
 * events. New documents are added and existing documents are updated.
 * Once the status is set to completed, cancelled or denied, then no further events will be accepted.
 */
export interface AccessStatusEvent {
  apiVersion: DSRVersion
  kind: Kind
  metadata: Metadata
  event: AccessResponseBody
}

/**
 * A Delete request is initiated when a Data Subject selects a right that allows for deleting of personal data.
 * To forward a Data Subject Request, Ketch sends a message using the POST method to the configured endpoint.
 * The format of the message and expected responses depend on the type of right invoked by the Data Subject.
 */
export interface DeleteRequest {
  apiVersion: DSRVersion
  kind: Kind
  metadata: Metadata
  request: {
    controller: string
    property: string
    environment: string
    regulation: string
    jurisdiction: string
    identities: Identity[]
    callbacks: Callback[]
    subject: DataSubject
    context: { [key: string]: any }
    submittedTimestamp: number
    dueTimestamp: number
  }
}

export interface DeleteResponseBody {
  status: string
  reason: string
  expectedCompletionTimestamp: number
  redirectUrl: string
  requestId: string
  documents: Document[]
  context: { [key: string]: any }
  subject: DataSubject
  identities: Identity[]
}

/**
 * A successful response MUST include the 200 OK response status code and a DeleteResponse JSON object.
 */
export interface DeleteResponse {
  apiVersion: DSRVersion
  kind: Kind
  metadata: Metadata
  response: DeleteResponseBody
}

/**
 * When the status of Delete Request has changed, a DeleteStatusEvent event should be sent to all the callbacks
 * specified in the request.  The results and documents are merged with any cached results from previous events.
 * New documents are added and existing documents are updated. Once the status is set to completed, cancelled or denied,
 * then no further events will be accepted.
 */
export interface DeleteStatusEvent {
  apiVersion: DSRVersion
  kind: Kind
  metadata: Metadata
  event: DeleteResponseBody
}

/**
 * Dsr Request
 */
export type DsrRequest = AccessRequest | DeleteRequest

/**
 * Dsr Response
 */
export type DsrResponse = AccessResponse | DeleteResponse

/**
 * ConnectionConfig is the key value pair of the connection parameters provided in the transponder UI
 */
export interface ConnectionConfig {
  [key: string]: string
}

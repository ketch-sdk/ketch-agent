/**
 * Kind of the request and response. Also used in type narrowing.
 */
export enum Kind {
  AccessRequest = 'AccessRequest',
  AccessResponse = 'AccessResponse',
  AccessStatusEvent = 'AccessStatusEvent',
  DeleteRequest = 'DeleteRequest',
  DeleteResponse = 'DeleteResponse',
  DeleteStatusEvent = 'DeleteStatusEvent',
}

/**
 * The Identity object describes the identity of a Data Subject.
 */
export interface Identity {
  identitySpace: string
  identityFormat: string
  identityValue: string
}

/**
 * The Callback object defines a URL and associated headers to be used for communicating information. The protocol for communicating with the Callback is defined for every object that uses the Callback.
 */
export interface Callback {
  url: string
  headers: { [key: string]: string }
}

/**
 * The Document object defines a way of providing document data to the Ketch platform. The Document object can look like a Callback object which allows Ketch to download the document using a simple HTTP GET.
 */
export interface Document extends Callback {
  data: string
}

/**
 * The Subject object describes the Data Subject making the request. The fields type, email, city, and description are read only. Any empty subject values will be ignored when patching the subject. Additional properties may exist in this object depending on the subject type.
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

/**
 * When the status of Access Request has changed, a AccessStatusEvent event JSON object should be sent to all the callbacks specified in the request.
 * The results and documents are merged with any cached results from previous events. New documents are added and existing documents are updated.
 * Once the status is set to completed, cancelled or denied, then no further events will be accepted.
 */
export interface AccessStatusEvent {
  apiVersion: string
  kind: Kind.AccessStatusEvent
  metadata: {
    uid: string
    tenant: string
  }
  event: {
    status: string
    reason: string
    expectedCompletionTimestamp: number
    redirectUrl: string
    requestId: string
    documents: Document[]
    context: { [key: string]: any }
    subject: DataSubject
    identities: Identity[]
    /** @alpha */
    messages: {}
  }
}

/**
 * An Access Request is initiated when a Data Subject invokes a right that allows Access/Portability of personal data.
 */
export interface AccessRequest {
  apiVersion: string
  kind: Kind.AccessRequest
  metadata: {
    uid: string
    tenant: string
  }
  requestBody: {
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

/**
 * A successful response MUST include the 200 OK response status code and a AccessResponse JSON object.
 */
export interface AccessResponse {
  apiVersion: string
  kind: Kind.AccessResponse
  metadata: {
    uid: string
    tenant: string
  }
  responseBody: {
    status: string
    reason: string
    expectedCompletionTimestamp: number
    redirectUrl: string
    requestId: string
    documents: Document[]
    context: { [key: string]: any }
    subject: DataSubject
    identities: Identity[]
    /** @alpha */
    messages: {}
  }
}

/**
 * When the status of Delete Request has changed, a DeleteStatusEvent event should be sent to all the callbacks specified in the request.
 * The results and documents are merged with any cached results from previous events. New documents are added and existing documents are updated.
 * Once the status is set to completed, cancelled or denied, then no further events will be accepted.
 */
export interface DeleteStatusEvent {
  apiVersion: string
  kind: Kind.DeleteStatusEvent
  metadata: {
    uid: string
    tenant: string
  }
  event: {
    status: string
    reason: string
    expectedCompletionTimestamp: number
    redirectUrl: string
    requestId: string
    documents: Document[]
    context: { [key: string]: any }
    subject: DataSubject
    identities: Identity[]
    /** @alpha */
    messages: {}
  }
}

/**
 * A Delete request is initiated when a Data Subject selects a right that allows for deleting of personal data.
 * To forward a Data Subject Request, Ketch sends a message using the POST method to the configured endpoint. The format of the message and expected responses depend on the type of right invoked by the Data Subject.
 */
export interface DeleteRequest {
  apiVersion: string
  kind: Kind.DeleteRequest
  metadata: {
    uid: string
    tenant: string
  }
  requestBody: {
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

/**
 * A successful response MUST include the 200 OK response status code and a DeleteResponse JSON object.
 */
export interface DeleteResponse {
  apiVersion: string
  kind: Kind.DeleteResponse
  metadata: {
    uid: string
    tenant: string
  }
  responseBody: {
    status: string
    reason: string
    expectedCompletionTimestamp: number
    redirectUrl: string
    requestId: string
    documents: Document[]
    context: { [key: string]: any }
    subject: DataSubject
    identities: Identity[]
    /** @alpha */
    messages: {}
  }
}

/**
 * Dsr Request
 */
export type DsrRequest = AccessRequest | DeleteRequest

/**
 * Dsr Response
 */
export type DsrResponse = AccessResponse | AccessStatusEvent | DeleteResponse | DeleteStatusEvent

export interface ConnectionConfig {
  [key: string]: string
}

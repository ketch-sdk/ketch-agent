enum Kind {
  DELETE = 'Delete',
  ACCESS = 'Access',
}

interface Identities {
  identitySpace: string
  identityFormat: string
  identityValue: string
}

interface Callback {
  url: string
  headers: { [key: string]: string }
}

interface Document extends Callback {
  data: string
}

interface DataSubject {
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

interface AccessRequest {
  apiVersion: string
  kind: Kind.ACCESS
  metadata?: {
    uid: string
    tenant: string
  }
  request: {
    controller: string
    property: string
    environment: string
    regulation: string
    jurisdiction: string
    identities: Identities[]
    callbacks: Callback[]
    subject: DataSubject
    context: { [key: string]: any }
    submittedTimestamp: number
    dueTimestamp: number
  }
}

interface AccessResponse {
  apiVersion: string
  kind: Kind.ACCESS
  metadata?: {
    uid: string
    tenant: string
  }
  response: {
    status: string
    reason: string
    expectedCompletionTimestamp: number
    redirectUrl: string
    requestId: string
    results: Document[]
    documents: Document[]
    context: { [key: string]: any }
    subject: DataSubject
    identities: Identities[]
    messages?: {}
  }
}

interface DeleteRequest {
  apiVersion: string
  kind: Kind.DELETE
  metadata?: {
    uid: string
    tenant: string
  }
  request: {
    controller: string
    property: string
    environment: string
    regulation: string
    jurisdiction: string
    identities: Identities[]
    callbacks: Callback[]
    subject: DataSubject
    context: { [key: string]: any }
    submittedTimestamp: number
    dueTimestamp: number
  }
}

interface DeleteResponse {
  apiVersion: string
  kind: Kind.DELETE
  metadata?: {
    uid: string
    tenant: string
  }
  response: {
    status: string
    reason: string
    expectedCompletionTimestamp: number
    redirectUrl: string
    requestId: string
    documents: Document[]
    context: { [key: string]: any }
    subject: DataSubject
    identities: Identities[]
    messages?: {}
  }
}

export type DsrRequest = AccessRequest | DeleteRequest
export type DsrResponse = AccessResponse | DeleteResponse
export interface ConnectionConfig {
  [key: string]: string
}

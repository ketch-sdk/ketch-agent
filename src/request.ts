import {ApiVersion, Metadata, DSRKind, Subject, Identity} from "./common";


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
  version: ApiVersion
  kind: DSRKind
  metadata: Metadata
  request: RequestData
  credentials: Credentials
}


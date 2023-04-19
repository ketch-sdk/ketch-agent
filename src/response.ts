import {ApiVersion, Metadata, DSRKind, Subject, Identity} from "./common";

export interface ResponseData {
  status: string,
  reason: string,
  expectedCompletionTimestamp: Date,
  requestID: string
  identities: Array<Identity>,
  subject: Subject,
  context: Map<string, any>
}

export interface DSRResponse {
  version: ApiVersion
  kind: DSRKind
  metadata: Metadata
  response: ResponseData
}


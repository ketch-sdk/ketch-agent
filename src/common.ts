export type ApiVersion = string

export enum DSRKind {
  DELETE,
  ACCESS
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

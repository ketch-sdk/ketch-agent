export interface NonPIILogger {
  WithString(str:string): NonPIILogger
  WithNumber(str:number): NonPIILogger
  WithError(err:Error): NonPIILogger
  Log(): Error
}

export interface AgentAPI {
  NonPIILog(): NonPIILogger
  AccessData(data: any): void
}


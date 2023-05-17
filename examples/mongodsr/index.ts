import {
  DsrRequest,
  DsrResponse,
  ConnectionConfig,
  Kind,
  DeleteStatusEvent,
  RequestStatus,
  RequestStatusReason,
} from '../../src/types'
import { MongoClient } from 'mongodb'
async function HandleRequest(req: DsrRequest, conn: ConnectionConfig): Promise<DsrResponse> {
  console.log(conn)
  let uri = `mongodb+srv://${conn.username}:${conn.password}@${conn.host}/?retryWrites=true&w=majority`
  console.log(uri)
  const client = new MongoClient(uri)
  try {
    await client.connect()
    // services.logger.push("Started processing dsr")
    // console.log()
    // console.error()
    const database = client.db('sample_restaurants')
    const restaurants = database.collection('restaurants')
    await restaurants.deleteOne({ owner_email: req.requestBody.subject.email })
    console.log('deleted')
  } catch (error) {
    console.error(error)
  } finally {
    console.log('in finally')
    await client.close()
  }
  return new Promise<DsrResponse>(resolve => {
    resolve({
      apiVersion: req.apiVersion,
      kind: Kind.DeleteStatusEvent,
      metadata: req.metadata,
      event: {
        status: RequestStatus.CompletedRequestStatus,
        reason: RequestStatusReason.Executed,
        expectedCompletionTimestamp: Date.now(),
        identities: req.requestBody.identities,
        subject: req.requestBody.subject,
        context: req.requestBody.context,
      },
    } as DeleteStatusEvent)
  })
}

export { HandleRequest }

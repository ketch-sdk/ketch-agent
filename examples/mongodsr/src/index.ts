import {
  type DSRRequest,
  type DSRResponse,
  type ConnectionConfig,
  Kind,
  RequestStatus,
  RequestStatusReason,
} from '@ketch-sdk/ketch-agent'
import { MongoClient } from 'mongodb'

export async function HandleRequest(req: DSRRequest, conn: ConnectionConfig): Promise<DSRResponse> {
  console.log(req)
  console.log(conn)
  let uri = `mongodb+srv://${conn.username}:${conn.password}@${conn.host}/?retryWrites=true&w=majority`
  console.log(uri)
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const database = client.db('sample_restaurants')
    const restaurants = database.collection('restaurants')
    await restaurants.deleteOne({ owner_email: req.request.subject.email })
    console.log('deleted')
  } catch (error) {
    console.error(error)
  } finally {
    console.log('in finally')
    await client.close()
  }

  return {
    apiVersion: req.apiVersion,
    kind: Kind.DeleteResponse,
    metadata: req.metadata,
    response: {
      status: RequestStatus.CompletedRequestStatus,
      reason: RequestStatusReason.Executed,
      expectedCompletionTimestamp: Math.floor(Date.now() / 1000),
    },
  }
}

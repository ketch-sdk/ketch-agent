import {
  type DsrRequest,
  type DsrResponse,
  type ConnectionConfig,
} from '@ketch-sdk/ketch-agent'
import { MongoClient } from 'mongodb'

export async function HandleRequest(req: DsrRequest, conn: ConnectionConfig): Promise<DsrResponse> {
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
  return new Promise<DsrResponse>(resolve => {
    return {
      apiVersion: req.apiVersion,
      kind: 'DeleteStatusEvent',
      metadata: req.metadata,
      response: {
        status: 'completed',
        reason: 'executed',
        expectedCompletionTimestamp: Date.now(),
        identities: req.request.identities,
        subject: req.request.subject,
        context: req.request.context,
      },
    }
  })
}

import { Kind, RequestStatus, RequestStatusReason } from '@ketch-sdk/ketch-agent'
import { MongoClient } from 'mongodb'

async function HandleRequest(req, conn) {
  let uri = `mongodb+srv://${conn.username}:${conn.password}@${conn.host}/?retryWrites=true&w=majority`
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const database = client.db('sample_restaurants')
    const restaurants = database.collection('restaurants')
    await restaurants.deleteOne({ email: req.request.subject.email })
  } catch (error) {
    throw error
  } finally {
    await client.close()
  }
  return {
    apiVersion: req.apiVersion,
    kind: Kind.DeleteResponse,
    metadata: req.metadata,
    response: {
      status: RequestStatus.CompletedRequestStatus,
      reason: RequestStatusReason.Executed,
      expectedCompletionTimestamp: Date.now(),
      identities: req.request.identities,
      subject: req.request.subject,
      context: req.request.context,
    },
  }
}

export { HandleRequest }

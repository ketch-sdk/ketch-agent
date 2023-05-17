import {
    DSRRequest,
    ConnectionConfig,
    DSRResponse,
    Identity,
    Subject,
    DSRKind,
    RequestStatus,
    RequestStatusReason
} from "./types.js";
import {MongoClient} from "mongodb";
async function HandleRequest(req :DSRRequest, conn :ConnectionConfig):Promise<DSRResponse> {
    console.log(conn)
    let uri = `mongodb+srv://${conn.username}:${conn.password}@${conn.host}/?retryWrites=true&w=majority`;
    console.log(uri)
    const client = new MongoClient(uri);
    try {
        await client.connect();
        // services.logger.push("Started processing dsr")
        // console.log()
        // console.error()
        const database = client.db("sample_restaurants");
        const restaurants = database.collection("restaurants");
        await restaurants.deleteOne({"owner_email": req.request.subject.email})
        console.log('deleted')
    }catch (error) {
        console.error(error)
    } finally {
        console.log('in finally')
        await client.close();
    }
    return new Promise<DSRResponse>((resolve)=>{
        resolve({
            apiVersion: req.apiVersion,
            kind: DSRKind.DeleteStatusEventKind,
            metadata: req.metadata,
            event: {
                status: RequestStatus.CompletedRequestStatus,
                reason: RequestStatusReason.Executed,
                expectedCompletionTimestamp: Date.now(),
                identities: req.request.identities,
                subject: req.request.subject,
                context: req.request.context
            }
        })
    })
}

export {
    HandleRequest,
}
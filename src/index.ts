/**
 * Ketch-agent defines the interfaces that implementations should conform to for executing custom scripts as part of Ketch Rights Workflow.  The implementations are invoked by Agent which runs as part of the Transponder.
 *
 * Agent provides the ability to run custom nodejs scripts within your environment as part of a Data Subject Rights (DSR) request orchestrated by Ketch.  Agent sets up the execution environment and calls the HandleRequest function with arguments as defined in this package.
 *
 * Implementations can consume the interfaces defined here and must not be concerned with how these interfaces are implemented by the Agent
 *
 * @packageDocumentation
 */
import * as api from "./api";
import * as request from "./request";
import * as response from "./response";
import * as common from "./common";

/**
 * HandleRequest is the entrypoint which will be invoked by the Agent.
 * request
*/
export async function HandleRequest(api: api.AgentAPI, req: request.DSRRequest): Promise<response.DSRResponse | null> {
  console.log(req)
  console.log(api)
  return new Promise<response.DSRResponse|null>((resolve) => {
    resolve(null)
  })
}

export {
  api,
  common,
  request,
  response
}

# Ketch Agent

Ketch Agent provides a platform for executing custom scripts for a rights invocation. The agent supports executing Deletion and Access requests from your Data Subjects (Data Subject Requests or DSR).

# How it works

Ketch Agent is a containerized application that is deployed inside your VPC as part the transponder deployment.
When the transponder is connected and authenticated to Ketch, the agent periodically checks for any DSR Right activity that needs to be executed.
When a user invokes their DSR Right, the right is forwarded to the agent which then downloads your nodejs module and executes it dynamically.
Currently, we support scripts hosted in AWS S3 behind default S3 authentication. You also have the option of hosting the script in a webserver that is accessible to the Ketch Agent at runtime.

# Entrypoint

Your module need to export the [HandleRequest](./functions/index.handleRequest.html) function as defined in this documentation. You can use handlers exposed as part of the argument to this function to interact with the Ketch platform at runtime.

# Runtime of Ketch agent

- Nodejs LTS/hydrogen (v18.16.0)

# More information

Reach out to support@ketch.com if you have any questions on how to leverage this integration.

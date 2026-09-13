# Movies API proxy

A single Lambda function, fronted by a Function URL, that holds the Gracenote/TMS API key
server-side so it never ships in the static site's client bundle. See
[docs/plans/hardening.md](../docs/plans/hardening.md) for why this exists.

## Prerequisites

- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- AWS CLI credentials configured (`aws configure`) for the account this should deploy to

## Deploy

```sh
cd aws
sam build
sam deploy --guided
```

`--guided` will prompt for the stack name, region, and the `TmsApiKey` parameter (paste the key —
it's marked `NoEcho` so it won't be echoed to the terminal or written to CloudFormation events in
plaintext). It also offers to save the non-secret choices to `samconfig.toml`; if you do, don't
commit the `TmsApiKey` into that file. Subsequent deploys can just be `sam deploy`.

After deploy, the Function URL is printed as a stack output (`FunctionUrl`) — also visible via:

```sh
aws cloudformation describe-stacks --stack-name <stack-name> --query "Stacks[0].Outputs"
```

## Local testing

```sh
sam local invoke MoviesProxyFunction --event events/sample.json \
  --parameter-overrides TmsApiKey=<key>
```

(No `events/sample.json` yet — create one with a `queryStringParameters` object containing `zip`,
`radius`, and `startDate` if you want to test locally before deploying.)

## Rotating the API key

```sh
sam deploy --parameter-overrides TmsApiKey=<new-key> AllowedOrigin=https://tcob.com
```

# Movies API proxy

A single Lambda function, fronted by a Function URL, that holds the Gracenote/TMS API key
server-side so it never ships in the static site's client bundle. See
[docs/plans/hardening.md](../docs/plans/hardening.md) for why this exists.

A CloudFront distribution sits in front of the Function URL and caches successful responses for
an hour, keyed by `zip`/`radius`/`startDate`. Repeat lookups for the same area/day are served from
the edge instead of invoking the Lambda or calling TMS again.

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

After deploy, the stack prints two outputs — also visible via:

```sh
aws cloudformation describe-stacks --stack-name <stack-name> --query "Stacks[0].Outputs"
```

- `CdnDomainName` — the CloudFront domain. Point `src/app/movies/service.ts` at this one.
- `FunctionUrl` — the raw Lambda Function URL, uncached. Useful for testing but shouldn't be
  called from the browser (every request would hit TMS directly).

CloudFront distributions take 5-15 minutes to finish deploying after `sam deploy` returns, so the
new `CdnDomainName` may 403/timeout for a few minutes before it's ready.

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

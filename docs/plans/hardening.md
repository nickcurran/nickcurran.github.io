# Hardening Plan

## Key Securing with Lambda

**Problem:** [`app/movies/service.ts`](../src/app/movies/service.ts) calls the Gracenote/TMS
movies API directly from the browser with a hardcoded API key. Because the site is a static
export with no server (see [docs/movies.md](movies.md)), the key ships in the client bundle to
every visitor and is permanently visible in the public repo's git history.

**Goal:** stop shipping the key to the browser by putting a small AWS Lambda in between. The
browser calls the Lambda; the Lambda holds the key server-side and forwards the request to TMS.

### Design

- **Lambda Function URL**, not API Gateway — same request pricing as Lambda itself, no extra
  service, built-in CORS support. API Gateway's free tier is only 12 months; Function URLs ride
  Lambda's free tier, which is permanent (1M requests + 400,000 GB-seconds/month, forever).
- **Plain environment variable** for the API key, not Secrets Manager — encrypted at rest by
  default, no $0.40/month recurring charge. Secrets Manager only earns its keep with rotation or
  fine-grained access policies, neither of which applies here.
- **CORS locked to `https://tcob.com`** (plus `http://localhost:3000` for local dev) so casual
  browser-based abuse of the endpoint is blocked at the platform level.
- **Reserved concurrency cap** (e.g. 5) on the function so a traffic spike or abuse attempt has a
  hard ceiling on cost, regardless of request volume.
- **AWS Budget alert** at a low threshold (e.g. $1) as a tripwire, independent of the above.

Expected steady-state cost: **$0/month** — see cost discussion in conversation history. The
concurrency cap and budget alert exist purely as guardrails against abuse, not because normal
usage is expected to cost anything.

### Steps

1. **Get a fresh TMS API key and revoke the old one.** The current key is permanently exposed in
   git history — rotating the proxy doesn't undo that. Request a new key from
   [developer.tmsapi.com](https://developer.tmsapi.com), confirm the old one is deactivated, and
   use only the new key going forward.

2. **Write the Lambda handler** (Node.js, no framework needed): accept `zip`, `radius`, and
   `startDate` query params from the request, build the upstream TMS URL using the key from
   `process.env.TMS_API_KEY`, fetch it, and return the JSON response with a
   `Access-Control-Allow-Origin` header matching the configured CORS rule. Keep it a single
   file — this doesn't need a routing framework for one endpoint.

3. **Package as infrastructure-as-code with AWS SAM** (a `template.yaml` + the handler file,
   likely under a new top-level `aws/` or `lambda/` directory in this repo). SAM keeps the setup
   reproducible and versioned instead of being click-ops in the AWS console, while staying much
   lighter than CDK/Terraform for a single function.
   - Define the function, its Function URL (with the CORS config and reserved concurrency),
     and the `TMS_API_KEY` environment variable (passed at deploy time, not committed).
   - `sam build && sam deploy --guided` for the first deploy; plain `sam deploy` after.

4. **Set the AWS Budget alert** (console or one `aws budgets create-budget` call) — independent
   of the SAM stack, one-time setup.

5. **Update `service.ts`** to call the new Lambda Function URL instead of `data.tmsapi.com`
   directly, and delete the hardcoded `apiKey` constant entirely.

6. **Test end-to-end**: `sam local invoke` (or `sam local start-lambda`) against the handler
   before deploying, then hit the deployed Function URL directly (`curl`) to confirm the response
   shape matches what `service.ts` expects, then run the movies page against it locally
   (`npm run dev`) before shipping.

7. **Update `docs/movies.md`**, which currently says the section "talks directly to a
   third-party API" from the browser — that description will no longer be accurate once the
   Lambda is in place.

8. **Remove the old key from history** (optional, separate decision): rotating the key makes the
   old one harmless, but it's still sitting in every clone of this repo's history. Rewriting
   history (`git filter-repo` or similar) is disruptive for a repo with existing clones/forks and
   is not required once the key is revoked — noted here as a follow-up to consider, not a
   blocking step.

### Open questions to confirm before implementing

- Preferred AWS region for the function (pick whatever's closest/cheapest; doesn't matter much
  for a low-traffic endpoint).
- Whether to keep the SAM stack's deploy as a manual local command (`sam deploy`) or eventually
  wire it into a GitHub Actions workflow — manual is simplest to start and matches this repo's
  otherwise-static deployment model.

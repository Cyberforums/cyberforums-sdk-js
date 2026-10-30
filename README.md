# @cyberforums/sdk

Cyberforums JS/TS **reference** SDK. Calls **BFF open API only** (not Discourse/Woo internals).

**Not published** to npm yet (`private: true`).

## Usage (stub)

```ts
import { Client } from "@cyberforums/sdk";

const client = new Client({
  baseUrl: "https://chat.example.com",
  token: process.env.CF_BFF_TOKEN!,
});

const data = await client.get("/v1/healthz");
await client.post("/v1/example", { hello: "world" });
```

See [cyberforums-docs](https://feicode.com/Cyberforums/cyberforums-docs) for architecture and integration guide.

## Actor rules

Do not send `actor` / `actor_id` from the client — the server derives them from the token.

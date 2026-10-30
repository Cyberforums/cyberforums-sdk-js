export type ClientOptions = {
  baseUrl: string;
  token: string;
  fetchImpl?: typeof fetch;
};

/**
 * Thin BFF HTTP client stub. Expand with typed routes as the open API stabilizes.
 */
export class Client {
  readonly baseUrl: string;
  readonly token: string;
  private readonly fetchImpl: typeof fetch;

  constructor(opts: ClientOptions) {
    this.baseUrl = opts.baseUrl.replace(/\/$/, "");
    this.token = opts.token;
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }

  async get(path: string, init?: RequestInit): Promise<Response> {
    return this.request("GET", path, undefined, init);
  }

  async post(path: string, body?: unknown, init?: RequestInit): Promise<Response> {
    return this.request("POST", path, body, init);
  }

  private async request(
    method: string,
    path: string,
    body?: unknown,
    init?: RequestInit
  ): Promise<Response> {
    const url = `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${this.token}`);
    if (body !== undefined && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    return this.fetchImpl(url, {
      ...init,
      method,
      headers,
      body: body === undefined ? init?.body : JSON.stringify(body),
    });
  }
}

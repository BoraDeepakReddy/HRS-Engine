// Shared fetch wrapper used by every service. Requests go to /api/* which the
// Vite dev server proxies to your Spring Boot backend on localhost:8080 (see vite.config.js).

const BASE_URL = "/api";

export async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.message || `Request failed (${res.status})`, res.status, body);
  }
  return res.status === 204 ? null : res.json();
}

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
}
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import { server } from "./mocks/node";

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "warn",
  })
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { describe, expect, it } from "vitest";

describe("App", () => {
  it("renders the App component", () => {
    render(<App />);

    const messages = screen.queryAllByText(/Vite/i);
    expect(messages).toHaveLength(2); // Check the number of matches
    expect(messages[0]).toBeVisible(); // Test the first match
  });
});

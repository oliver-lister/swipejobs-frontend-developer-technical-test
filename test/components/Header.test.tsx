import { render, screen } from "@testing-library/react";
import Header from "../../src/components/header/Header";

describe("Header Component", () => {
  it("should render the logo and worker name", async () => {
    render(<Header />);

    const logo = screen.getByAltText("swipejobs Logo");
    const workerName = screen.getByText("Jim Rose");

    expect(logo).toBeVisible();
    expect(workerName).toBeVisible();
  });
});

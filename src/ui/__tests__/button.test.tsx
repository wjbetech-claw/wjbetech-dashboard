import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Button } from "../button";

describe("Button", () => {
  it("renders and responds to clicks", async () => {
    const handle = vi.fn();
    render(<Button onClick={handle}>Click me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeInTheDocument();
    await userEvent.click(btn);
    expect(handle).toHaveBeenCalled();
  });
});
import { render } from "@testing-library/react";
import { Button } from "../button";

test("renders button", () => {
  const { getByText } = render(<Button>Click</Button>);
  expect(getByText("Click")).toBeInTheDocument();
});

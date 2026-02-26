import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders with default variant", () => {
    render(<Badge>New</Badge>);
    const el = screen.getByText("New");
    expect(el).toBeInTheDocument();
  });
});
import { render } from "@testing-library/react";
import { Badge } from "../badge";

test("renders badge", () => {
  const { getByText } = render(<Badge>Active</Badge>);
  expect(getByText("Active")).toBeInTheDocument();
});

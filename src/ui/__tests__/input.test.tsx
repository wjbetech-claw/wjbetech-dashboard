import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Input } from "../input";

describe("Input", () => {
  it("renders and applies aria-required when required", async () => {
    render(<Input placeholder="name" required />);
    const input = screen.getByPlaceholderText("name") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("aria-required", "true");
    await userEvent.type(input, "hello");
    expect(input.value).toBe("hello");
  });

  it("does not set aria-required when not required", () => {
    render(<Input placeholder="email" />);
    const input = screen.getByPlaceholderText("email") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-required");
  });
});
import { render } from "@testing-library/react";
import { Input } from "../input";

test("renders input", () => {
  const { getByPlaceholderText } = render(<Input placeholder="Email" />);
  expect(getByPlaceholderText("Email")).toBeInTheDocument();
});

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Select } from "../select";

describe("Select", () => {
  it("renders and applies aria-required when required", async () => {
    render(
      <Select required>
        <option value="">Choose</option>
        <option value="1">One</option>
      </Select>
    );
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("required");
    expect(select).toHaveAttribute("aria-required", "true");
    await userEvent.selectOptions(select, "1");
    expect(select.value).toBe("1");
  });

  it("does not set aria-required when not required", () => {
    render(
      <Select>
        <option value="">Choose</option>
      </Select>
    );
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select).not.toHaveAttribute("aria-required");
  });
});
import { render } from "@testing-library/react";
import { Select } from "../select";

test("renders select", () => {
  const { getByRole } = render(
    <Select>
      <option>One</option>
    </Select>
  );
  expect(getByRole("combobox")).toBeInTheDocument();
});

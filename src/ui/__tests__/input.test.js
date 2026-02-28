import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Input } from "../input";
describe("Input", () => {
    it("renders and applies aria-required when required", async () => {
        render(_jsx(Input, { placeholder: "name", required: true }));
        const input = screen.getByPlaceholderText("name");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("required");
        expect(input).toHaveAttribute("aria-required", "true");
        await userEvent.type(input, "hello");
        expect(input.value).toBe("hello");
    });
    it("does not set aria-required when not required", () => {
        render(_jsx(Input, { placeholder: "email" }));
        const input = screen.getByPlaceholderText("email");
        expect(input).toBeInTheDocument();
        expect(input).not.toHaveAttribute("aria-required");
    });
});
test("renders input", () => {
    const { getByPlaceholderText } = render(_jsx(Input, { placeholder: "Email" }));
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
});
//# sourceMappingURL=input.test.js.map
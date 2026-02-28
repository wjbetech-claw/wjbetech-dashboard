import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Select } from "../select";
describe("Select", () => {
    it("renders and applies aria-required when required", async () => {
        render(_jsxs(Select, { required: true, children: [_jsx("option", { value: "", children: "Choose" }), _jsx("option", { value: "1", children: "One" })] }));
        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();
        expect(select).toHaveAttribute("required");
        expect(select).toHaveAttribute("aria-required", "true");
        await userEvent.selectOptions(select, "1");
        expect(select.value).toBe("1");
    });
    it("does not set aria-required when not required", () => {
        render(_jsx(Select, { children: _jsx("option", { value: "", children: "Choose" }) }));
        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();
        expect(select).not.toHaveAttribute("aria-required");
    });
});
test("renders select", () => {
    const { getByRole } = render(_jsx(Select, { children: _jsx("option", { children: "One" }) }));
    expect(getByRole("combobox")).toBeInTheDocument();
});
//# sourceMappingURL=select.test.js.map
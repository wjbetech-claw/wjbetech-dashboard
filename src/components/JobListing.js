import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export default function JobListing({ list }) {
    return (_jsxs("div", { className: 'card', children: [_jsx("h3", { style: { margin: 0 }, children: "Job Listings" }), _jsx("ul", { style: { marginTop: 12 }, children: list.map((j, i) => (_jsx("li", { style: { marginBottom: 10 }, children: _jsxs("a", { className: 'cursor-pointer', href: '#', children: [j.title, " \u2014 ", j.company] }) }, i))) })] }));
}
//# sourceMappingURL=JobListing.js.map
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export default function ActiveJob({ job }) {
    return (_jsxs("div", { className: 'card', children: [_jsx("h2", { style: { margin: 0 }, children: job.title }), _jsx("p", { style: { color: 'var(--muted)' }, children: job.signal }), _jsxs("div", { style: { marginTop: 12 }, children: [_jsxs("p", { style: { color: 'var(--muted)' }, children: ["Updated: ", job.updated] }), _jsx("button", { className: 'cursor-pointer', style: { marginTop: 8 }, children: "Open PR" })] })] }));
}
//# sourceMappingURL=ActiveJob.js.map
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export default function RecentCommits({ commits }) {
    return (_jsxs("div", { className: 'card', children: [_jsx("h4", { style: { margin: 0 }, children: "Recent Commits" }), _jsx("ul", { style: { marginTop: 12 }, children: commits.map((c, i) => (_jsx("li", { style: { color: 'var(--muted)' }, children: c }, i))) })] }));
}
//# sourceMappingURL=RecentCommits.js.map
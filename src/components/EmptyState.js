import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export default function EmptyState({ title, description, action }) {
    return (_jsxs("div", { className: "bg-level-1 border-subtle rounded-md p-6 text-center", role: "status", "aria-live": "polite", children: [_jsx("h3", { className: "text-lg font-medium text-primary mb-2", children: title }), description && _jsx("p", { className: "text-sm text-muted mb-4", children: description }), action && _jsx("div", { children: action })] }));
}
//# sourceMappingURL=EmptyState.js.map
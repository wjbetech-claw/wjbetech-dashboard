import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
export function ErrorBanner({ message, onRetry }) {
    return (_jsxs("div", { style: { padding: 12, border: '1px solid var(--color-error)', borderRadius: 10, background: 'rgba(239,68,68,0.08)' }, children: [_jsx("div", { style: { fontWeight: 600, color: 'var(--color-error)' }, children: "Error" }), _jsx("div", { style: { fontSize: 12, marginTop: 4 }, children: message }), onRetry ? _jsx("button", { className: 'cursor-pointer', onClick: onRetry, style: { marginTop: 8, padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 8, background: 'transparent' }, children: "Retry" }) : null] }));
}
//# sourceMappingURL=error-banner.js.map
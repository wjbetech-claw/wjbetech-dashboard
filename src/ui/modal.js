import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
export function Modal({ open, onClose, title, children }) {
    if (!open)
        return null;
    return (_jsx("div", { style: { position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }, role: "dialog", "aria-modal": "true", "aria-label": title, children: _jsxs("div", { style: { background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, width: 'min(520px,90vw)', boxShadow: '0 20px 40px rgba(15,23,42,0.25)' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, children: [_jsx("div", { style: { fontWeight: 700, fontSize: 16 }, children: title }), _jsx("button", { className: 'cursor-pointer', onClick: onClose, style: { border: '1px solid var(--border)', borderRadius: 8, background: 'transparent', padding: '2px 6px' }, children: "\u2715" })] }), children] }) }));
}
//# sourceMappingURL=modal.js.map
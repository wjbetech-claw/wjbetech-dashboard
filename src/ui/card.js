import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export default function Card({ title, subtitle, children, className }) {
    return (_jsxs("section", { className: className, style: { background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 14, padding: 16, boxShadow: '0 10px 30px rgba(15,23,42,0.06)' }, children: [title ? (_jsxs("div", { style: { marginBottom: 12 }, children: [_jsx("div", { style: { fontWeight: 700, fontSize: 16 }, children: title }), subtitle ? _jsx("div", { style: { opacity: 0.7, fontSize: 12, marginTop: 4 }, children: subtitle }) : null] })) : null, children] }));
}
//# sourceMappingURL=card.js.map
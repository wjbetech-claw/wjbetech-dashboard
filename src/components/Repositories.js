import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export default function Repositories({ repos }) {
    return (_jsx("div", { children: repos.map(r => (_jsx("div", { className: 'card', style: { marginBottom: 12 }, children: _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontWeight: 700 }, children: r.name }), _jsx("div", { style: { color: 'var(--muted)', fontSize: '0.9rem' }, children: r.desc })] }), _jsxs("div", { style: { textAlign: 'right' }, children: [_jsx("div", { style: { fontWeight: 700 }, children: r.status }), _jsx("div", { style: { color: 'var(--muted)', fontSize: '0.9rem' }, children: r.lastCommit })] })] }) }, r.name))) }));
}
//# sourceMappingURL=Repositories.js.map
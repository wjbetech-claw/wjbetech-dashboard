import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
export default function Navbar() {
    return (_jsxs("header", { className: 'w-full', style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: 'var(--panel)', borderBottom: '1px solid var(--border)' }, children: [_jsx("div", { style: { display: 'flex', alignItems: 'center', gap: 12 }, children: _jsx("div", { style: { fontWeight: 700 }, children: "wjbetech-dashboard" }) }), _jsx("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: _jsx(ThemeSwitcher, {}) })] }));
}
//# sourceMappingURL=Navbar.js.map